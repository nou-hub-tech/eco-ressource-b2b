import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { PdfGeneratorService } from '../../../core/services/pdf-generator.service';
import { ShipmentService } from '../../../core/services/shipment.service';
import { AuthService, User } from '../../../core/services/auth.service';
import { ShipmentUpdateService } from '../../../core/services/shipment-update.service';
import { TransportService, Transporter } from '../../../core/services/transport.service';
import { DeliveryOrder } from '../../../core/models/delivery-order';
import { StatutCommande, StatutExpedition } from '../../../core/models/statut';
import { Shipment } from '../../../core/models/shipment';
import { environment } from '../../../../environments/environment';
import { LivraisonIAService, PredictionLivraison, Probleme } from '../../../core/services/livraison-ia.service';
import { NotificationApiService } from '../../../core/services/notification-api.service';

import * as L from 'leaflet';

@Component({
    selector: 'app-trips',
    standalone: false,
    templateUrl: './trips.html',
    styleUrls: ['./trips.css']
})
export class Trips implements OnInit, AfterViewInit, OnDestroy {
    showModal = false;
    showMapModal = false;
    selectedTrip: any = null;
    isLoadingLocation = false;
    locationError: string | null = null;
    locationSuccess: string | null = null;
    locationWarning: string | null = null;
    private mainMap: any = null;
    private userMarker: any = null;
    private watchId: number | null = null;
    isTracking = false;
    isSelectingLocation = false;

    userLat: number = 36.8065;
    userLng: number = 10.1815;
    deliveryOrders: DeliveryOrder[] = [];
    availableTrips: any[] = [];
    acceptedTrips: Map<number, any> = new Map();
    isLoadingTrips = false;
    private orderMarkers: any[] = [];
    private routeLines: any[] = [];
    hasActiveTrip: boolean = false;
    currentAcceptedTrip: any = null;
    private refreshInterval: any;

    currentTransporterId: number = 0;
    currentTransporterName: string = '';
    private transportersList: Transporter[] = [];
    private transportersLoaded: boolean = false;
    private apiUrl = environment.apiUrl;

    iaPrediction: PredictionLivraison | null = null;
    showProblemeModal = false;
    problemeType: string = 'EMBOUTEILLAGE';
    problemeDescription: string = '';
    problemeRetard: number = 30;
    toastMessage: string = '';

    // ✅ Mapping client nom → ID utilisateur
    private clientNameToUserId: Map<string, number> = new Map();

    constructor(
        private deliveryOrderService: DeliveryOrderService,
        private pdfGenerator: PdfGeneratorService,
        private shipmentService: ShipmentService,
        private authService: AuthService,
        private shipmentUpdateService: ShipmentUpdateService,
        private transportService: TransportService,
        private cd: ChangeDetectorRef,
        private iaService: LivraisonIAService,
        private notificationApiService: NotificationApiService
    ) { }

    async ngOnInit(): Promise<void> {
        console.log('🚚 INITIALISATION DE TRIPS');

        await this.loadTransportersList();
        await this.getCurrentTransporter();

        (window as any).L = L;
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        this.loadSavedPosition();
        this.loadAcceptedTripsFromStorage();
        this.loadDeliveryOrders();

        window.addEventListener('orderChanged', this.handleOrderChange.bind(this));

        this.refreshInterval = setInterval(() => {
            this.checkForOrderChanges();
        }, 5000);

        setTimeout(() => {
            if (this.mainMap) {
                this.addOrderMarkersToMap();
                setTimeout(() => {
                    this.drawAllAcceptedRoutes();
                }, 500);
            }
        }, 2000);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initMainMap();
        }, 500);
    }

    loadTransportersList(): Promise<void> {
        return new Promise((resolve) => {
            console.log('📡 Chargement de la liste des transporteurs...');
            console.log('📡 URL:', `${this.apiUrl}/transporters`);

            this.transportService.getAllTransporters().subscribe({
                next: (list: Transporter[]) => {
                    this.transportersList = list;
                    this.transportersLoaded = true;
                    console.log('✅ Transporteurs chargés:', this.transportersList.length);
                    this.transportersList.forEach(t => {
                        console.log(`   → ID: ${t.id} | Nom: ${t.companyName} | user_id: ${t.userId}`);
                    });
                    resolve();
                },
                error: (err) => {
                    console.error('❌ Erreur chargement transporteurs:', err);
                    this.transportersList = [
                        { id: 1, userId: 3, companyName: 'Karim Logistics', sector: '', taxId: '', listingsCount: 0, ordersCount: 0, revenue: '', createdAt: new Date().toISOString() },
                        { id: 2, userId: 4, companyName: 'linda', sector: '', taxId: '', listingsCount: 0, ordersCount: 0, revenue: '', createdAt: new Date().toISOString() }
                    ];
                    this.transportersLoaded = true;
                    console.log('✅ Données mock chargées:', this.transportersList);
                    resolve();
                }
            });
        });
    }

    async getCurrentTransporter(): Promise<void> {
        console.log('🔍 Recherche du transporteur connecté...');

        if (!this.transportersLoaded) {
            await this.loadTransportersList();
        }

        const currentUser = this.authService.currentUser;
        console.log('👤 Utilisateur courant:', currentUser);

        if (currentUser && currentUser.role === 'transporter') {
            const userId = parseInt(currentUser.id, 10);
            console.log(`🔍 user_id = ${userId}`);

            const transporter = this.transportersList.find(t => t.userId === userId);

            if (transporter) {
                this.currentTransporterId = transporter.id;
                this.currentTransporterName = transporter.companyName;
                console.log('✅✅✅ TRANSPORTEUR TROUVÉ ! ✅✅✅');
                console.log(`   → user_id connecté: ${userId}`);
                console.log(`   → transporter.id: ${this.currentTransporterId}`);
                console.log(`   → transporter.name: ${this.currentTransporterName}`);
            } else {
                console.error(`❌ Aucun transporteur trouvé pour user_id = ${userId}`);
                this.currentTransporterId = 0;
                this.currentTransporterName = '';
            }
        } else {
            console.warn('⚠️ Aucun utilisateur transporteur connecté');
        }

        this.authService.user$.subscribe(user => {
            if (user && user.role === 'transporter') {
                const userId = parseInt(user.id, 10);
                const transporter = this.transportersList.find(t => t.userId === userId);
                if (transporter) {
                    this.currentTransporterId = transporter.id;
                    this.currentTransporterName = transporter.companyName;
                    console.log('🔄 Mise à jour transporteur:', this.currentTransporterName);
                    this.cd.detectChanges();
                }
            }
        });

        this.cd.detectChanges();
    }

    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round((R * c) * 10) / 10;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    saveEarning(amount: number, date: Date, deliveryOrderId: number): void {
        const earnings = this.getEarnings();
        earnings.push({
            id: deliveryOrderId,
            amount: amount,
            date: date.toISOString(),
            month: date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' }),
            year: date.getFullYear(),
            monthIndex: date.getMonth()
        });
        localStorage.setItem('earnings', JSON.stringify(earnings));
    }

    getEarnings(): any[] {
        const saved = localStorage.getItem('earnings');
        return saved ? JSON.parse(saved) : [];
    }

    saveAcceptedTripsToStorage(): void {
        const acceptedData = Array.from(this.acceptedTrips.entries()).map(([id, trip]) => ({
            id: id,
            to: trip.to,
            lat: trip.lat,
            lng: trip.lng,
            clientName: trip.clientName,
            address: trip.address,
            distance: trip.distance,
            date: trip.date,
            acceptedAt: trip.acceptedAt,
            completed: trip.completed || false,
            transporterId: trip.transporterId,
            targetClientId: trip.targetClientId
        }));
        localStorage.setItem('acceptedTrips', JSON.stringify(acceptedData));
        localStorage.setItem('hasActiveTrip', JSON.stringify(this.hasActiveTrip));
        if (this.currentAcceptedTrip) {
            localStorage.setItem('currentAcceptedTrip', JSON.stringify(this.currentAcceptedTrip));
        } else {
            localStorage.removeItem('currentAcceptedTrip');
        }
    }

    loadAcceptedTripsFromStorage(): void {
        const saved = localStorage.getItem('acceptedTrips');
        if (saved) {
            const acceptedData = JSON.parse(saved);
            acceptedData.forEach((data: any) => {
                this.acceptedTrips.set(data.id, {
                    ...data,
                    accepted: true
                });
            });
        }

        const savedActive = localStorage.getItem('hasActiveTrip');
        this.hasActiveTrip = savedActive === 'true';

        const savedCurrent = localStorage.getItem('currentAcceptedTrip');
        if (savedCurrent) {
            this.currentAcceptedTrip = JSON.parse(savedCurrent);
            // Recalculer l'IA pour que le panneau reste affiché après un rechargement
            this.calculerPredictionIA(this.currentAcceptedTrip);
        }

        console.log('Trajets acceptés chargés:', this.acceptedTrips.size);
    }

    loadDeliveryOrders(): void {
        console.log('Chargement des commandes...');
        this.isLoadingTrips = true;

        this.deliveryOrderService.getAll().subscribe({
            next: (orders: DeliveryOrder[]) => {
                console.log('Commandes reçues:', orders.length);
                this.deliveryOrders = orders;

                // ✅ Construire le mapping des clients
                this.buildClientMapping();

                this.calculateAvailableTrips();

                setTimeout(() => {
                    this.isLoadingTrips = false;
                    this.addOrderMarkersToMap();
                    setTimeout(() => {
                        this.drawAllAcceptedRoutes();
                    }, 500);
                    this.cd.detectChanges();
                }, 0);
            },
            error: (error) => {
                console.error('Erreur:', error);
                setTimeout(() => {
                    this.isLoadingTrips = false;
                    this.cd.detectChanges();
                }, 0);
                this.loadMockData();
            }
        });
    }

    // ✅ Construire le mapping nom_client → ID utilisateur
    buildClientMapping(): void {
        // Mapping manuel basé sur vos données
        this.clientNameToUserId.set('slim ben ali', 2);
        this.clientNameToUserId.set('Linda Slimi', 37);
        // Ajoutez d'autres clients ici au fur et à mesure

        console.log('📋 Mapping clients chargé:', Array.from(this.clientNameToUserId.entries()));
    }

    // ✅ Récupérer l'ID utilisateur à partir du nom du client
    getClientUserId(clientName: string): number {
        const userId = this.clientNameToUserId.get(clientName);
        if (userId) {
            return userId;
        }
        console.warn(`⚠️ Client non trouvé dans le mapping: ${clientName}, utilisation fallback 2`);
        return 2; // Fallback par défaut
    }

    loadMockData(): void {
        console.log('Chargement des données de test');
        this.availableTrips = [
            {
                id: 1001,
                from: this.getCurrentCityName(),
                to: 'Tunis',
                cargo: 'Équipements électroniques',
                weight: '250 kg',
                co2: '8 kg',
                status: 'EN_ATTENTE',
                date: new Date(),
                lat: 36.8065,
                lng: 10.1815,
                address: 'Zone Industrielle, Tunis',
                clientName: 'TechStore Tunisie',
                telephone: '71 123 456',
                distance: this.calculateDistance(this.userLat, this.userLng, 36.8065, 10.1815),
                accepted: false,
                completed: false
            },
            {
                id: 1002,
                from: this.getCurrentCityName(),
                to: 'Sfax',
                cargo: 'Pièces détachées',
                weight: '500 kg',
                co2: '18 kg',
                status: 'EN_ATTENTE',
                date: new Date(),
                lat: 34.7406,
                lng: 10.7603,
                address: 'Route de Gabès, Sfax',
                clientName: 'AutoPièces Sfax',
                telephone: '74 456 789',
                distance: this.calculateDistance(this.userLat, this.userLng, 34.7406, 10.7603),
                accepted: false,
                completed: false
            },
            {
                id: 1003,
                from: this.getCurrentCityName(),
                to: 'Sousse',
                cargo: 'Textile',
                weight: '300 kg',
                co2: '12 kg',
                status: 'EN_ATTENTE',
                date: new Date(),
                lat: 35.8256,
                lng: 10.6367,
                address: 'Zone Touristique, Sousse',
                clientName: 'Mode Méditerranée',
                telephone: '73 789 012',
                distance: this.calculateDistance(this.userLat, this.userLng, 35.8256, 10.6367),
                accepted: false,
                completed: false
            }
        ];

        this.ensureActiveTripInList();

        this.availableTrips.sort((a, b) => {
            if (a.accepted && !b.accepted) return -1;
            if (!a.accepted && b.accepted) return 1;
            return a.distance - b.distance;
        });

        setTimeout(() => {
            this.addOrderMarkersToMap();
            setTimeout(() => {
                this.drawAllAcceptedRoutes();
            }, 500);
            this.cd.detectChanges();
        }, 1000);
    }

    extraireVilleFromAdresse(adresse: string): string {
        const villes = [
            'Tunis', 'Ariana', 'Ben Arous', 'La Marsa', 'Sidi Bou Said',
            'Manouba', 'Mégrine', 'Rades', 'Hammam Lif', 'Sousse',
            'Sfax', 'Gabès', 'Bizerte', 'Nabeul', 'Kairouan', 'Béja',
            'Jendouba', 'Le Kef', 'Gafsa', 'Tozeur', 'Tataouine',
            'Monastir', 'Mahdia', 'Kasserine', 'Sidi Bouzid'
        ];

        for (const ville of villes) {
            if (adresse && adresse.toLowerCase().includes(ville.toLowerCase())) {
                return ville;
            }
        }
        return 'Tunis';
    }

    calculateAvailableTrips(): void {
        console.log('Calcul des trajets disponibles...');
        this.availableTrips = [];

        if (!this.deliveryOrders || this.deliveryOrders.length === 0) {
            console.log('Aucune commande trouvée');
            return;
        }

        const tunisiaCities: { [key: string]: { lat: number; lng: number } } = {
            'Tunis': { lat: 36.8065, lng: 10.1815 },
            'Ariana': { lat: 36.8601, lng: 10.1934 },
            'Ben Arous': { lat: 36.7532, lng: 10.2187 },
            'Manouba': { lat: 36.8078, lng: 10.0956 },
            'Bizerte': { lat: 37.2744, lng: 9.8739 },
            'Béja': { lat: 36.7256, lng: 9.1817 },
            'Jendouba': { lat: 36.5015, lng: 8.7802 },
            'Nabeul': { lat: 36.4561, lng: 10.7376 },
            'Zaghouan': { lat: 36.4029, lng: 10.1427 },
            'Le Kef': { lat: 36.1742, lng: 8.7049 },
            'Siliana': { lat: 36.0850, lng: 9.3708 },
            'Kairouan': { lat: 35.6781, lng: 10.0964 },
            'Kasserine': { lat: 35.1676, lng: 8.8365 },
            'Sidi Bouzid': { lat: 35.0381, lng: 9.4858 },
            'Sousse': { lat: 35.8256, lng: 10.6367 },
            'Monastir': { lat: 35.7780, lng: 10.8260 },
            'Mahdia': { lat: 35.5045, lng: 11.0622 },
            'Sfax': { lat: 34.7406, lng: 10.7603 },
            'Gabès': { lat: 33.8815, lng: 10.0982 },
            'Médenine': { lat: 33.3545, lng: 10.5055 },
            'Tataouine': { lat: 32.9297, lng: 10.4518 },
            'Gafsa': { lat: 34.4250, lng: 8.7842 },
            'Tozeur': { lat: 33.9197, lng: 8.1335 },
            'Kebili': { lat: 33.7044, lng: 8.9690 }
        };

        this.deliveryOrders.forEach(order => {
            if (order.statut !== StatutCommande.LIVREE) {
                let cityLat: number | null = null;
                let cityLng: number | null = null;
                let cityName = '';

                for (const [city, coords] of Object.entries(tunisiaCities)) {
                    if (order.adresseLivraison && order.adresseLivraison.toLowerCase().includes(city.toLowerCase())) {
                        cityLat = coords.lat;
                        cityLng = coords.lng;
                        cityName = city;
                        break;
                    }
                }

                if (!cityLat) {
                    cityLat = 36.8065;
                    cityLng = 10.1815;
                    cityName = 'Tunis';
                }

                const distance = this.calculateDistance(this.userLat, this.userLng, cityLat, cityLng);

                console.log(`📦 Commande #${order.idDelivery}: ${cityName}, distance: ${distance} km`);

                const isAccepted = this.acceptedTrips.has(order.idDelivery);
                const isCompleted = this.acceptedTrips.get(order.idDelivery)?.completed || false;

                this.availableTrips.push({
                    id: order.idDelivery,
                    from: this.getCurrentCityName(),
                    to: cityName,
                    cargo: 'Marchandise',
                    weight: 'N/A',
                    co2: Math.round(distance * 0.2) + ' kg',
                    status: order.statut,
                    date: order.datePrevue || new Date(),
                    lat: cityLat,
                    lng: cityLng,
                    address: order.adresseLivraison,
                    clientName: order.nomClient,
                    telephone: order.telephoneClient,
                    distance: distance,
                    order: order,
                    accepted: isAccepted,
                    completed: isCompleted
                });
            }
        });

        this.ensureActiveTripInList();

        this.availableTrips.sort((a, b) => {
            if (a.accepted && !b.accepted) return -1;
            if (!a.accepted && b.accepted) return 1;
            return a.distance - b.distance;
        });
        console.log('Trajets disponibles:', this.availableTrips.length);
        this.cd.detectChanges();
    }

    // Gère le cas où un trajet accepté n'est plus renvoyé par l'API ou on est passé sur les mocks
    ensureActiveTripInList(): void {
        if (this.hasActiveTrip && this.currentAcceptedTrip) {
            const exists = this.availableTrips.some(t => t.id === this.currentAcceptedTrip.id);
            if (!exists) {
                console.warn('⚠️ Trajet actif non trouvé dans la liste courante, on l\'ajoute manuellement.');
                // S'assurer que le flag accepted est true
                this.currentAcceptedTrip.accepted = true;
                this.availableTrips.unshift(this.currentAcceptedTrip);
            }
        }
    }

    getCurrentCityName(): string {
        const cities = [
            { name: 'Tunis', lat: 36.8065, lng: 10.1815, radius: 30 },
            { name: 'Sfax', lat: 34.7406, lng: 10.7603, radius: 30 },
            { name: 'Sousse', lat: 35.8256, lng: 10.6367, radius: 30 }
        ];

        for (const city of cities) {
            const dist = this.calculateDistance(this.userLat, this.userLng, city.lat, city.lng);
            if (dist < city.radius) {
                return city.name;
            }
        }
        return 'Ma position';
    }

    drawAllAcceptedRoutes(): void {
        if (!this.mainMap) return;

        this.routeLines.forEach(line => {
            if (this.mainMap) this.mainMap.removeLayer(line);
        });
        this.routeLines = [];

        this.acceptedTrips.forEach((trip) => {
            if (!trip.completed) {
                this.drawRoute(trip.lat, trip.lng);
            }
        });
    }

    drawRoute(destLat: number, destLng: number): void {
        if (!this.mainMap) return;
        if (!this.userLat || !this.userLng || !destLat || !destLng) return;

        const latlngs: L.LatLngExpression[] = [[this.userLat, this.userLng], [destLat, destLng]];
        const routeLine = L.polyline(latlngs, {
            color: '#d4a574',
            weight: 4,
            opacity: 0.8,
            dashArray: '8, 8'
        }).addTo(this.mainMap);

        this.routeLines.push(routeLine);
    }

    addOrderMarkersToMap(): void {
        console.log('addOrderMarkersToMap appelé');

        if (!this.mainMap) {
            console.log('Carte non initialisée, attente...');
            setTimeout(() => this.addOrderMarkersToMap(), 1000);
            return;
        }

        this.orderMarkers.forEach(marker => {
            if (this.mainMap) this.mainMap.removeLayer(marker);
        });
        this.orderMarkers = [];

        const allTrips = [...this.availableTrips];

        this.acceptedTrips.forEach((trip) => {
            if (!allTrips.find(t => t.id === trip.id)) {
                allTrips.push({
                    ...trip,
                    accepted: true,
                    completed: trip.completed || false
                });
            }
        });

        const tripsByCity = new Map<string, any[]>();
        allTrips.forEach(trip => {
            if (trip.lat && trip.lng) {
                const city = trip.to;
                if (!tripsByCity.has(city)) {
                    tripsByCity.set(city, []);
                }
                tripsByCity.get(city)!.push(trip);
            }
        });

        const orderIcon = L.divIcon({
            html: `<div style="background-color: #dc3545; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; font-weight: bold;">📦</div>`,
            iconSize: [30, 30],
            className: 'order-marker'
        });

        const acceptedIcon = L.divIcon({
            html: `<div style="background-color: #28a745; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; font-weight: bold;">🚚</div>`,
            iconSize: [30, 30],
            className: 'accepted-marker'
        });

        const completedIcon = L.divIcon({
            html: `<div style="background-color: #17a2b8; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; font-weight: bold;">✓</div>`,
            iconSize: [30, 30],
            className: 'completed-marker'
        });

        tripsByCity.forEach((trips, cityName) => {
            const firstTrip = trips[0];
            const lat = firstTrip.lat;
            const lng = firstTrip.lng;

            const pendingTrips = trips.filter(t => !t.completed);

            if (pendingTrips.length === 0) {
                return;
            }

            const hasAvailable = pendingTrips.some(t => !t.accepted);
            const hasAccepted = pendingTrips.some(t => t.accepted && !t.completed);
            const pendingCount = pendingTrips.length;
            const availableCount = pendingTrips.filter(t => !t.accepted).length;

            let icon;
            let statusText = '';
            let showAcceptButton = false;

            if (hasAccepted && !hasAvailable) {
                icon = acceptedIcon;
                statusText = `🚚 ${pendingCount} commande(s) en cours`;
                showAcceptButton = false;
            } else if (hasAccepted && hasAvailable) {
                icon = acceptedIcon;
                statusText = `🚚 En cours + ${availableCount} disponible(s)`;
                showAcceptButton = true;
            } else {
                icon = orderIcon;
                statusText = `📦 ${pendingCount} commande(s) disponible(s)`;
                showAcceptButton = true;
            }

            let popupContent = `
                <div style="min-width: 280px;">
                    <strong style="color: ${hasAccepted ? '#28a745' : '#dc3545'};">📍 ${cityName}</strong><br>
                    <b>Status:</b> ${statusText}<br>
                    <hr style="margin: 8px 0;">
            `;

            pendingTrips.forEach(trip => {
                popupContent += `
                    <div style="margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 8px;">
                        <b>Client:</b> ${trip.clientName}<br>
                        <b>Adresse:</b> ${trip.address}<br>
                        <b>Distance:</b> ${trip.distance} km<br>
                        <b>Statut:</b> ${trip.accepted ? '🚚 En cours' : '📦 Disponible'}<br>
                `;
                if (!trip.accepted && !trip.completed && showAcceptButton && !this.hasActiveTrip) {
                    popupContent += `
                        <button onclick="document.querySelector('app-trips').acceptTripById(${trip.id})" 
                                style="margin-top:8px; padding:5px 12px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">
                            ✅ Accepter cette commande
                        </button>
                    `;
                } else if (trip.accepted && !trip.completed) {
                    popupContent += `
                        <button onclick="document.querySelector('app-trips').completeTrip(${trip.id})" 
                                style="margin-top:8px; padding:5px 12px; background:#17a2b8; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">
                            ✅ Terminer la livraison
                        </button>
                    `;
                }
                popupContent += `</div>`;
            });

            popupContent += `</div>`;

            const marker = L.marker([lat, lng], { icon: icon })
                .addTo(this.mainMap)
                .bindPopup(popupContent);

            this.orderMarkers.push(marker);
        });

        console.log('Marqueurs ajoutés:', this.orderMarkers.length);
    }

    acceptTripById(tripId: number): void {
        const trip = this.availableTrips.find(t => t.id === tripId);
        if (trip && !trip.accepted) {
            this.acceptTrip(trip);
        }
    }

    calculerPredictionIA(trip: any): void {
        const depart = this.getCurrentCityName();
        const arrivee = this.extraireVilleFromAdresse(trip.address);

        console.log(`🤖 IA: Calcul prédiction de ${depart} vers ${arrivee}`);

        this.iaPrediction = this.iaService.predireLivraison(depart, arrivee);

        console.log('📊 Résultat IA:', this.iaPrediction);
    }

    openProblemeModal(): void {
        console.log('🟢 openProblemeModal appelé');
        this.showProblemeModal = true;
        this.cd.detectChanges();
    }

    closeProblemeModal(): void {
        console.log('🔴 closeProblemeModal appelé');
        this.showProblemeModal = false;
        this.problemeDescription = '';
        this.problemeRetard = 30;
        this.cd.detectChanges();
    }

    // ✅ METHODE CORRIGÉE - ENVOI DYNAMIQUE
    envoyerAlerteClient(): void {
        console.log('📨 envoyerAlerteClient appelé');
        if (!this.currentAcceptedTrip) {
            console.error('❌ Pas de trajet actif');
            this.locationError = '❌ Aucun trajet actif';
            setTimeout(() => this.locationError = null, 3000);
            return;
        }

        const probleme = this.iaService.signalerProbleme(
            this.problemeType,
            this.problemeDescription,
            this.problemeRetard
        );

        // ✅ Récupérer l'ID utilisateur dynamiquement à partir du nom du client
        const clientName = this.currentAcceptedTrip.clientName;
        const clientId = this.getClientUserId(clientName);

        console.log(`🔍 Envoi notification à ${clientName} (ID: ${clientId})`);
        console.log(`📝 Message: ${probleme.messageClient}`);

        if (clientId === 0) {
            console.error('❌ Client non trouvé dans le mapping');
            this.locationError = '❌ Client non identifié';
            setTimeout(() => this.locationError = null, 3000);
            this.closeProblemeModal();
            return;
        }

        this.notificationApiService.sendNotification(clientId, {
            type: 'PROBLEME_LIVRAISON',
            deliveryOrderId: this.currentAcceptedTrip.id,
            clientName: clientName,
            targetUserId: clientId,
            message: probleme.messageClient,
            problemeType: this.problemeType,
            retardMinutes: this.problemeRetard,
            timestamp: new Date().toISOString()
        }).subscribe({
            next: (response) => {
                console.log('✅ Notification envoyée avec succès à', clientName, '(ID:', clientId, ')');
                this.toastMessage = `✅ Client notifié`;
                setTimeout(() => this.toastMessage = '', 5000);
            },
            error: (err) => {
                // Le navigateur affichera toujours l'erreur 403 nativement, 
                // mais on a bien intercepté l'erreur pour activer le mode hors-ligne.
                
                // Fallback local storage pour le client
                const localNotifs = JSON.parse(localStorage.getItem('notifications_' + clientId) || '[]');
                localNotifs.push({
                    type: 'PROBLEME_LIVRAISON',
                    deliveryOrderId: this.currentAcceptedTrip.id,
                    clientName: clientName,
                    targetUserId: clientId,
                    message: probleme.messageClient,
                    problemeType: this.problemeType,
                    retardMinutes: this.problemeRetard,
                    timestamp: new Date().toISOString(),
                    read: false,
                    id: Date.now().toString()
                });
                localStorage.setItem('notifications_' + clientId, JSON.stringify(localNotifs));

                // Fallback pour My Deliveries admin panel
                const adminNotifs = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
                adminNotifs.push({
                    type: 'PROBLEME_LIVRAISON',
                    deliveryOrderId: this.currentAcceptedTrip.id,
                    clientName: clientName,
                    targetUserId: clientId,
                    message: probleme.messageClient,
                    problemeType: this.problemeType,
                    retardMinutes: this.problemeRetard,
                    timestamp: new Date().toISOString(),
                    read: false,
                    id: Date.now().toString()
                });
                localStorage.setItem('admin_notifications', JSON.stringify(adminNotifs));

                this.locationWarning = `🚨 Problème signalé et enregistré localement (Erreur Serveur/403)`;
                setTimeout(() => this.locationWarning = null, 5000);
            }
        });

        this.locationWarning = `🚨 Problème signalé: ${probleme.type}`;
        setTimeout(() => this.locationWarning = '', 8000);
        this.closeProblemeModal();
    }

    acceptTrip(trip: any): void {
        console.log('🔍 Recherche dynamique du transporteur...');

        const currentUser = this.authService.currentUser;

        if (currentUser && currentUser.id && this.transportersList.length > 0) {
            const userId = parseInt(currentUser.id, 10);
            let transporter = this.transportersList.find(t => t.userId === userId);

            if (!transporter && currentUser.name) {
                transporter = this.transportersList.find(t =>
                    t.companyName?.toLowerCase().trim() === currentUser.name?.toLowerCase().trim()
                );
            }

            if (!transporter && this.transportersList.length > 0) {
                transporter = this.transportersList[0];
                console.log('⚠️ Fallback: premier transporteur');
            }

            if (transporter) {
                this.currentTransporterId = transporter.id;
                this.currentTransporterName = transporter.companyName;
                console.log(`✅ Transporteur: ${this.currentTransporterName} (ID: ${this.currentTransporterId})`);
            }
        } else if (this.transportersList.length > 0) {
            this.currentTransporterId = this.transportersList[0].id;
            this.currentTransporterName = this.transportersList[0].companyName;
        }

        if (!this.currentTransporterId || this.currentTransporterId <= 0) {
            this.locationError = '❌ Aucun transporteur disponible';
            setTimeout(() => this.locationError = null, 5000);
            return;
        }

        if (this.hasActiveTrip) {
            this.locationError = '❌ Trajet déjà en cours';
            setTimeout(() => this.locationError = null, 5000);
            return;
        }

        if (trip.accepted) {
            this.locationError = '❌ Trajet déjà accepté';
            setTimeout(() => this.locationError = null, 3000);
            return;
        }

        if (confirm(`Accepter le trajet vers ${trip.to} (${trip.distance} km) ?`)) {
            this.deliveryOrderService.updateStatut(trip.id, StatutCommande.EN_COURS).subscribe({
                next: () => {
                    this.deliveryOrderService.getById(trip.id).subscribe({
                        next: (deliveryOrder: DeliveryOrder) => {
                            this.pdfGenerator.generateDeliveryOrderPDF(deliveryOrder);
                            this.shipmentService.getAll().subscribe({
                                next: (shipments: Shipment[]) => {
                                    const existingShipment = shipments.find(s => s.deliveryOrder?.idDelivery === trip.id);
                                    const nowIso = new Date().toISOString();

                                    // Récupérer l'ID du client pour le stocker dans le trajet
                                    const targetClientId = this.getClientUserId(trip.clientName);

                                    if (existingShipment && existingShipment.id) {
                                        const updatedShipment: Shipment = {
                                            ...existingShipment,
                                            idTransporter: this.currentTransporterId,
                                            statut: StatutExpedition.EN_COURS,
                                            dateDepart: existingShipment.dateDepart || nowIso
                                        };
                                        this.shipmentService.update(existingShipment.id, updatedShipment).subscribe({
                                            next: (shipment: Shipment) => {
                                                console.log('✅ Expédition mise à jour');
                                                this.notificationApiService.sendNotification(targetClientId, {
                                                    type: 'ACCEPTATION_LIVRAISON',
                                                    deliveryOrderId: trip.id,
                                                    clientName: trip.clientName,
                                                    targetUserId: targetClientId,
                                                    transporterName: this.currentTransporterName,
                                                    message: `${this.currentTransporterName} a accepté votre livraison`,
                                                    timestamp: new Date().toISOString()
                                                }).subscribe();
                                                this.shipmentUpdateService.notifyShipmentUpdate({
                                                    type: 'SHIPMENT_UPDATED',
                                                    shipment: shipment,
                                                    transporterId: this.currentTransporterId,
                                                    transporterName: this.currentTransporterName,
                                                    deliveryOrderId: trip.id,
                                                    clientName: trip.clientName,
                                                    timestamp: new Date()
                                                });
                                            }
                                        });
                                    } else {
                                        const newShipment: Shipment = {
                                            id: 0,
                                            deliveryOrder: { idDelivery: trip.id },
                                            produitId: 1,
                                            quantite: 1,
                                            idTransporter: this.currentTransporterId,
                                            dateDepart: nowIso,
                                            statut: StatutExpedition.EN_COURS
                                        };
                                        this.shipmentService.create(newShipment).subscribe({
                                            next: (shipment: Shipment) => {
                                                console.log('✅ Expédition créée');
                                                this.notificationApiService.sendNotification(targetClientId, {
                                                    type: 'ACCEPTATION_LIVRAISON',
                                                    deliveryOrderId: trip.id,
                                                    clientName: trip.clientName,
                                                    targetUserId: targetClientId,
                                                    transporterName: this.currentTransporterName,
                                                    message: `${this.currentTransporterName} a accepté votre livraison`,
                                                    timestamp: new Date().toISOString()
                                                }).subscribe();
                                                this.shipmentUpdateService.notifyShipmentUpdate({
                                                    type: 'NEW_SHIPMENT',
                                                    shipment: shipment,
                                                    transporterId: this.currentTransporterId,
                                                    transporterName: this.currentTransporterName,
                                                    deliveryOrderId: trip.id,
                                                    clientName: trip.clientName,
                                                    timestamp: new Date()
                                                });
                                            }
                                        });
                                    }
                                }
                            });

                            trip.accepted = true;
                            trip.completed = false;
                            trip.transporterId = this.currentTransporterId;
                            trip.transporterName = this.currentTransporterName;
                            this.hasActiveTrip = true;
                            this.currentAcceptedTrip = {
                                id: trip.id,
                                to: trip.to,
                                lat: trip.lat,
                                lng: trip.lng,
                                clientName: trip.clientName,
                                address: trip.address,
                                distance: trip.distance,
                                date: trip.date,
                                acceptedAt: new Date().toISOString(),
                                completed: false,
                                transporterId: this.currentTransporterId,
                                transporterName: this.currentTransporterName,
                                targetClientId: this.getClientUserId(trip.clientName)
                            };

                            this.acceptedTrips.set(trip.id, this.currentAcceptedTrip);
                            this.saveAcceptedTripsToStorage();
                            this.calculateAvailableTrips();
                            this.addOrderMarkersToMap();

                            setTimeout(() => this.calculerPredictionIA(trip), 500);
                            setTimeout(() => this.drawRoute(trip.lat, trip.lng), 500);

                            this.locationSuccess = `✅ Trajet accepté vers ${trip.to} !`;
                            setTimeout(() => this.locationSuccess = null, 5000);
                            this.cd.detectChanges();
                        }
                    });
                }
            });
        }
    }

    completeTrip(tripId: number): void {
        const trip = this.acceptedTrips.get(tripId) || this.availableTrips.find(t => t.id === tripId);
        if (!trip) {
            this.locationError = '❌ Trajet non trouvé';
            setTimeout(() => this.locationError = null, 3000);
            return;
        }

        if (confirm(`Confirmez-vous la livraison terminée pour ${trip.to} ?`)) {
            this.deliveryOrderService.updateStatut(tripId, StatutCommande.LIVREE).subscribe({
                next: () => {
                    this.saveEarning(8, new Date(), tripId);
                    this.shipmentService.getAll().subscribe({
                        next: (shipments: Shipment[]) => {
                            const shipment = shipments.find(s => s.deliveryOrder.idDelivery === tripId);
                            if (shipment) {
                                shipment.statut = StatutExpedition.LIVREE;
                                this.shipmentService.update(shipment.id, shipment).subscribe({
                                    next: () => {
                                        console.log('Expédition mise à jour');
                                        this.shipmentUpdateService.notifyShipmentUpdate({
                                            type: 'SHIPMENT_COMPLETED',
                                            shipmentId: shipment.id,
                                            deliveryOrderId: tripId
                                        });
                                    }
                                });
                            }
                        }
                    });

                    if (this.acceptedTrips.has(tripId)) {
                        const updatedTrip = this.acceptedTrips.get(tripId);
                        updatedTrip.completed = true;
                        this.acceptedTrips.set(tripId, updatedTrip);
                    }

                    const availableTrip = this.availableTrips.find(t => t.id === tripId);
                    if (availableTrip) {
                        availableTrip.completed = true;
                        availableTrip.accepted = true;
                    }

                    this.hasActiveTrip = false;
                    this.currentAcceptedTrip = null;
                    this.iaPrediction = null;

                    this.routeLines.forEach(line => {
                        if (this.mainMap) this.mainMap.removeLayer(line);
                    });
                    this.routeLines = [];

                    this.saveAcceptedTripsToStorage();
                    this.calculateAvailableTrips();
                    this.addOrderMarkersToMap();

                    this.cd.detectChanges();
                    this.locationSuccess = `✅ Livraison terminée pour ${trip.to} ! +8 TND`;
                    setTimeout(() => this.locationSuccess = null, 5000);
                }
            });
        }
    }

    refuseTrip(trip: any): void {
        if (trip.accepted) {
            this.locationError = '❌ Ce trajet a déjà été accepté';
            setTimeout(() => this.locationError = null, 3000);
            return;
        }

        if (confirm(`Refuser le trajet vers ${trip.to} ?`)) {
            this.locationSuccess = `❌ Trajet refusé`;
            setTimeout(() => this.locationSuccess = null, 3000);
            const index = this.availableTrips.indexOf(trip);
            if (index > -1) {
                this.availableTrips.splice(index, 1);
                this.addOrderMarkersToMap();
                this.cd.detectChanges();
            }
        }
    }

    savePosition(lat: number, lng: number): void {
        this.userLat = lat;
        this.userLng = lng;
        localStorage.setItem('userLat', lat.toString());
        localStorage.setItem('userLng', lng.toString());
        this.calculateAvailableTrips();
        this.updateMapPosition(lat, lng);
        this.addOrderMarkersToMap();
        setTimeout(() => this.drawAllAcceptedRoutes(), 500);
        this.cd.detectChanges();
    }

    loadSavedPosition(): void {
        const savedLat = localStorage.getItem('userLat');
        const savedLng = localStorage.getItem('userLng');
        if (savedLat && savedLng) {
            this.userLat = parseFloat(savedLat);
            this.userLng = parseFloat(savedLng);
        }
    }

    enableManualLocationSelection(): void {
        this.isSelectingLocation = true;
        this.locationSuccess = '📍 Cliquez sur la carte pour définir votre position';
        const mapContainer = document.getElementById('mainMap');
        if (mapContainer) mapContainer.style.cursor = 'crosshair';
        setTimeout(() => {
            if (this.locationSuccess === '📍 Cliquez sur la carte pour définir votre position') {
                this.locationSuccess = null;
            }
        }, 5000);
    }

    disableManualLocationSelection(): void {
        this.isSelectingLocation = false;
        const mapContainer = document.getElementById('mainMap');
        if (mapContainer) mapContainer.style.cursor = '';
    }

    getUserLocation(): void {
        if (!navigator.geolocation) {
            this.locationError = '❌ GPS non supporté';
            this.enableManualLocationSelection();
            return;
        }

        this.isLoadingLocation = true;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.savePosition(position.coords.latitude, position.coords.longitude);
                this.locationSuccess = `📍 Position GPS trouvée !`;
                setTimeout(() => this.locationSuccess = null, 5000);
                this.isLoadingLocation = false;
            },
            (error) => {
                console.error('Erreur GPS:', error);
                this.isLoadingLocation = false;
                this.locationError = '❌ GPS indisponible';
                setTimeout(() => this.locationError = null, 5000);
                this.enableManualLocationSelection();
            }
        );
    }

    startRealTimeTracking(): void {
        if (this.isTracking) this.stopRealTimeTracking();
        if (!navigator.geolocation) {
            this.locationError = '❌ GPS non supporté';
            return;
        }
        this.isTracking = true;
        this.locationSuccess = '📍 Suivi en temps réel activé';
        setTimeout(() => this.locationSuccess = null, 3000);
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.savePosition(position.coords.latitude, position.coords.longitude),
            (error) => {
                console.error('Erreur suivi:', error);
                this.stopRealTimeTracking();
                this.locationError = '❌ Suivi interrompu';
                setTimeout(() => this.locationError = null, 3000);
            }
        );
    }

    stopRealTimeTracking(): void {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        this.isTracking = false;
        this.locationSuccess = '⏹️ Suivi arrêté';
        setTimeout(() => this.locationSuccess = null, 3000);
    }

    private updateMapPosition(lat: number, lng: number): void {
        if (this.mainMap) {
            this.mainMap.setView([lat, lng], 12);
            if (this.userMarker) {
                this.userMarker.setLatLng([lat, lng]);
            } else {
                const userIcon = L.divIcon({
                    html: `<div style="background-color: #d4a574; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px #d4a574;"></div>`,
                    iconSize: [24, 24],
                    className: 'user-marker'
                });
                this.userMarker = L.marker([lat, lng], { icon: userIcon })
                    .addTo(this.mainMap)
                    .bindPopup('<strong>📍 Votre position</strong>')
                    .openPopup();
            }
        }
    }

    initMainMap(): void {
        const mapContainer = document.getElementById('mainMap');
        if (!mapContainer || typeof L === 'undefined') {
            console.warn('Map container #mainMap not in DOM yet, retrying...');
            setTimeout(() => this.initMainMap(), 800);
            return;
        }
        // Prevent double-init
        if ((mapContainer as any)['_leaflet_id']) {
            return;
        }
        this.mainMap = L.map('mainMap').setView([this.userLat, this.userLng], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.mainMap);
        this.mainMap.on('click', (e: any) => {
            if (this.isSelectingLocation) {
                this.savePosition(e.latlng.lat, e.latlng.lng);
                this.disableManualLocationSelection();
                this.locationSuccess = `📍 Position manuelle définie !`;
                setTimeout(() => this.locationSuccess = null, 3000);
            }
        });
        this.updateMapPosition(this.userLat, this.userLng);
        setTimeout(() => {
            this.addOrderMarkersToMap();
            setTimeout(() => this.drawAllAcceptedRoutes(), 500);
        }, 1000);
        console.log('Carte initialisée');
    }

    openMapModal(trip: any): void {
        this.selectedTrip = trip;
        this.showMapModal = true;
        setTimeout(() => this.initRouteMap(), 500);
    }

    initRouteMap(): void {
        const mapContainer = document.getElementById('routeMap');
        if (!mapContainer || !this.selectedTrip || typeof L === 'undefined') return;
        if ((mapContainer as any)._leaflet_id) {
            const existingMap = (window as any).routeMap;
            if (existingMap) existingMap.remove();
        }
        const map = L.map('routeMap').setView([this.userLat, this.userLng], 10);
        (window as any).routeMap = map;
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
        L.marker([this.userLat, this.userLng]).addTo(map).bindPopup('<strong>📍 Votre position</strong>').openPopup();
        L.marker([this.selectedTrip.lat, this.selectedTrip.lng]).addTo(map)
            .bindPopup(`<strong>${this.selectedTrip.to}</strong><br>Client: ${this.selectedTrip.clientName}<br>Adresse: ${this.selectedTrip.address}<br>Distance: ${this.selectedTrip.distance} km`)
            .openPopup();
        const latlngs = [[this.userLat, this.userLng], [this.selectedTrip.lat, this.selectedTrip.lng]];
        const polyline = L.polyline(latlngs, { color: '#d4a574', weight: 3 }).addTo(map);
        map.fitBounds(polyline.getBounds());
    }

    openModal(): void { this.showModal = true; }
    closeModal(): void { this.showModal = false; }
    closeMapModal(): void {
        this.showMapModal = false;
        this.selectedTrip = null;
    }

    ngOnDestroy(): void {
        this.stopRealTimeTracking();
        window.removeEventListener('orderChanged', this.handleOrderChange.bind(this));
        if (this.refreshInterval) clearInterval(this.refreshInterval);
    }

    handleOrderChange(): void {
        console.log('Changement d\'ordre détecté, rechargement des données...');
        this.loadDeliveryOrders();
        this.deliveryOrderService.getAll().subscribe({
            next: (orders: DeliveryOrder[]) => {
                orders.forEach(order => {
                    if (order.statut === StatutCommande.LIVREE) {
                        if (this.acceptedTrips.has(order.idDelivery) && !this.acceptedTrips.get(order.idDelivery).completed) {
                            console.log(`Marquage automatique du trajet ${order.idDelivery} comme terminé`);
                            this.autoCompleteTrip(order.idDelivery);
                        }
                    }
                });
            }
        });
    }

    autoCompleteTrip(tripId: number): void {
        const trip = this.acceptedTrips.get(tripId);
        if (!trip) return;
        this.shipmentService.getAll().subscribe({
            next: (shipments: Shipment[]) => {
                const shipment = shipments.find(s => s.deliveryOrder.idDelivery === tripId);
                if (shipment) {
                    shipment.statut = StatutExpedition.LIVREE;
                    this.shipmentService.update(shipment.id, shipment).subscribe();
                }
            }
        });
        this.saveEarning(8, new Date(), tripId);
        trip.completed = true;
        this.acceptedTrips.set(tripId, trip);
        const availableTrip = this.availableTrips.find(t => t.id === tripId);
        if (availableTrip) availableTrip.completed = true;
        if (this.currentAcceptedTrip && this.currentAcceptedTrip.id === tripId) {
            this.hasActiveTrip = false;
            this.currentAcceptedTrip = null;
            this.iaPrediction = null;
        }
        this.routeLines.forEach(line => { if (this.mainMap) this.mainMap.removeLayer(line); });
        this.routeLines = [];
        this.saveAcceptedTripsToStorage();
        this.calculateAvailableTrips();
        this.addOrderMarkersToMap();
        this.locationSuccess = `✅ Livraison terminée automatiquement pour ${trip.to} ! +8 TND`;
        setTimeout(() => this.locationSuccess = null, 5000);
        this.cd.detectChanges();
    }

    checkForOrderChanges(): void {
        this.deliveryOrderService.getAll().subscribe({
            next: (orders: DeliveryOrder[]) => {
                this.deliveryOrders = orders || [];
                this.calculateAvailableTrips();
                this.addOrderMarkersToMap();
                this.cd.detectChanges();
                let hasChanges = false;
                orders.forEach(order => {
                    if (this.acceptedTrips.has(order.idDelivery)) {
                        const trip = this.acceptedTrips.get(order.idDelivery);
                        if (order.statut === StatutCommande.LIVREE && !trip.completed) {
                            hasChanges = true;
                            this.autoCompleteTrip(order.idDelivery);
                        }
                    }
                });
                if (hasChanges) this.loadDeliveryOrders();
            }
        });
    }

    diagnosticTransporteur(): void {
        console.log('=== DIAGNOSTIC TRANSPORTEUR ===');
        console.log('transportersLoaded:', this.transportersLoaded);
        console.log('transportersList:', this.transportersList);
        console.log('currentTransporterId:', this.currentTransporterId);
        console.log('currentTransporterName:', this.currentTransporterName);
        const currentUser = this.authService.currentUser;
        console.log('currentUser:', currentUser);
        if (currentUser) {
            const userId = parseInt(currentUser.id, 10);
            console.log('user_id:', userId);
            const found = this.transportersList.find(t => t.userId === userId);
            console.log('Transporteur trouvé par userId:', found);
        }
        alert(`Diagnostic:\nTransporteur ID: ${this.currentTransporterId}\nNom: ${this.currentTransporterName}\nListe taille: ${this.transportersList.length}`);
    }

    diagnosticCommandes(): void {
        console.log('=== DIAGNOSTIC COMMANDES ===');
        console.log('Commandes reçues:', this.deliveryOrders.length);
        if (this.deliveryOrders.length === 0) {
            alert('❌ Aucune commande chargée ! Vérifiez l\'API');
            return;
        }
        this.deliveryOrders.forEach(order => {
            console.log(`- #${order.idDelivery}: ${order.nomClient} - ${order.adresseLivraison} - ${order.statut}`);
        });
        alert(`${this.deliveryOrders.length} commandes chargées. Regardez la console (F12) pour les détails.`);
    }

    diagnosticIA(): void {
        console.log('=== DIAGNOSTIC IA ===');
        console.log('Prédiction actuelle:', this.iaPrediction);
        alert(`IA Active\nPrédiction: ${this.iaPrediction?.tempsEnHeures || 'N/A'}\nConfiance: ${this.iaPrediction?.confiance || 'N/A'}%`);
    }
}