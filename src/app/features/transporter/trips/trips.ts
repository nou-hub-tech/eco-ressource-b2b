import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { PdfGeneratorService } from '../../../core/services/pdf-generator.service';
import { ShipmentService } from '../../../core/services/shipment.service';
import { DeliveryOrder } from '../../../core/models/delivery-order';
import { StatutCommande, StatutExpedition } from '../../../core/models/statut';
import { Shipment } from '../../../core/models/shipment';

declare var L: any;

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
    
    constructor(
        private deliveryOrderService: DeliveryOrderService,
        private pdfGenerator: PdfGeneratorService,
        private shipmentService: ShipmentService,
        private cd: ChangeDetectorRef
    ) {}
    
    ngOnInit(): void {
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
            completed: trip.completed || false
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
        }
        
        console.log('Trajets acceptés chargés:', this.acceptedTrips.size);
        console.log('Trajet actif:', this.hasActiveTrip);
    }
    
    loadDeliveryOrders(): void {
        console.log('Chargement des commandes...');
        this.isLoadingTrips = true;
        
        this.deliveryOrderService.getAll().subscribe({
            next: (orders: DeliveryOrder[]) => {
                console.log('Commandes reçues:', orders);
                this.deliveryOrders = orders;
                this.calculateAvailableTrips();
                this.isLoadingTrips = false;
                
                setTimeout(() => {
                    this.addOrderMarkersToMap();
                    setTimeout(() => {
                        this.drawAllAcceptedRoutes();
                    }, 500);
                    this.cd.detectChanges();
                }, 1000);
            },
            error: (error) => {
                console.error('Erreur:', error);
                this.isLoadingTrips = false;
                this.loadMockData();
            }
        });
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
        this.availableTrips.sort((a, b) => a.distance - b.distance);
        
        setTimeout(() => {
            this.addOrderMarkersToMap();
            setTimeout(() => {
                this.drawAllAcceptedRoutes();
            }, 500);
            this.cd.detectChanges();
        }, 1000);
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
            'Sfax': { lat: 34.7406, lng: 10.7603 },
            'Sousse': { lat: 35.8256, lng: 10.6367 },
            'Bizerte': { lat: 37.2744, lng: 9.8739 },
            'Gabès': { lat: 33.8815, lng: 10.0982 },
            'Nabeul': { lat: 36.4561, lng: 10.7376 },
            'Kairouan': { lat: 35.6781, lng: 10.0964 }
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
        
        this.availableTrips.sort((a, b) => a.distance - b.distance);
        console.log('Trajets disponibles:', this.availableTrips.length);
        this.cd.detectChanges();
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
        
        const latlngs = [[this.userLat, this.userLng], [destLat, destLng]];
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
        
        const orderIcon = L.divIcon({
            html: `<div style="background-color: #dc3545; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 10px; color: white; font-weight: bold;">📦</div>`,
            iconSize: [24, 24],
            className: 'order-marker'
        });
        
        const acceptedIcon = L.divIcon({
            html: `<div style="background-color: #28a745; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 10px; color: white; font-weight: bold;">✅</div>`,
            iconSize: [24, 24],
            className: 'accepted-marker'
        });
        
        const completedIcon = L.divIcon({
            html: `<div style="background-color: #17a2b8; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 10px; color: white; font-weight: bold;">✓</div>`,
            iconSize: [24, 24],
            className: 'completed-marker'
        });
        
        allTrips.forEach((trip) => {
            if (trip.lat && trip.lng) {
                let icon = orderIcon;
                
                if (trip.completed) {
                    icon = completedIcon;
                } else if (trip.accepted) {
                    icon = acceptedIcon;
                }
                
                let popupContent = `
                    <div style="min-width: 200px;">
                        <strong style="color: ${trip.completed ? '#17a2b8' : (trip.accepted ? '#28a745' : '#dc3545')};">📍 ${trip.to}</strong><br>
                        <b>Client:</b> ${trip.clientName}<br>
                        <b>Adresse:</b> ${trip.address}<br>
                        <b>Distance:</b> ${trip.distance} km<br>
                `;
                
                if (!trip.accepted && !this.hasActiveTrip) {
                    popupContent += `
                        <button onclick="document.querySelector('app-trips').acceptTripById(${trip.id})" 
                                style="margin-top:8px; padding:5px 12px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">
                            ✅ Accepter ce trajet
                        </button>
                    `;
                } else if (!trip.accepted && this.hasActiveTrip) {
                    popupContent += `
                        <div style="margin-top:8px; padding:5px; background:#ffc107; color:#856404; border-radius:5px; text-align:center;">
                            ⚠️ Trajet en cours
                        </div>
                    `;
                } else if (trip.accepted && !trip.completed) {
                    popupContent += `
                        <div style="margin-top:8px; padding:5px; background:#28a745; color:white; border-radius:5px; text-align:center;">
                            🚚 Trajet en cours
                        </div>
                        <button onclick="document.querySelector('app-trips').completeTrip(${trip.id})" 
                                style="margin-top:8px; padding:5px 12px; background:#17a2b8; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">
                            ✅ Terminer la livraison
                        </button>
                    `;
                } else {
                    popupContent += `
                        <div style="margin-top:8px; padding:5px; background:#17a2b8; color:white; border-radius:5px; text-align:center;">
                            ✅ Livraison terminée
                        </div>
                    `;
                }
                
                popupContent += `</div>`;
                
                const marker = L.marker([trip.lat, trip.lng], { icon: icon })
                    .addTo(this.mainMap)
                    .bindPopup(popupContent);
                
                this.orderMarkers.push(marker);
            }
        });
        
        console.log('Marqueurs ajoutés:', this.orderMarkers.length);
    }
    
    acceptTripById(tripId: number): void {
        const trip = this.availableTrips.find(t => t.id === tripId);
        if (trip && !trip.accepted) {
            this.acceptTrip(trip);
        }
    }
    
    acceptTrip(trip: any): void {
        if (this.hasActiveTrip) {
            this.locationError = '❌ Vous avez déjà un trajet en cours. Terminez-le avant d\'en accepter un nouveau.';
            setTimeout(() => this.locationError = null, 5000);
            return;
        }
        
        if (trip.accepted) {
            this.locationError = '❌ Ce trajet a déjà été accepté';
            setTimeout(() => this.locationError = null, 3000);
            return;
        }
        
        if (confirm(`Accepter le trajet vers ${trip.to} (${trip.distance} km) ? Un bon d'expédition sera généré.`)) {
            
            this.deliveryOrderService.updateStatut(trip.id, StatutCommande.EN_COURS).subscribe({
                next: () => {
                    this.deliveryOrderService.getById(trip.id).subscribe({
                        next: (deliveryOrder: DeliveryOrder) => {
                            
                            const newShipment: Shipment = {
                                id: 0,
                                deliveryOrder: { idDelivery: trip.id },
                                produitId: 1,
                                quantite: 1,
                                idTransporter: 1,
                                dateDepart: new Date().toISOString(),
                                statut: StatutExpedition.EN_COURS
                            };
                            
                            this.shipmentService.create(newShipment).subscribe({
                                next: (shipment: Shipment) => {
                                    this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
                                    
                                    // Mise à jour locale
                                    trip.accepted = true;
                                    trip.completed = false;
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
                                        completed: false
                                    };
                                    
                                    this.acceptedTrips.set(trip.id, this.currentAcceptedTrip);
                                    this.saveAcceptedTripsToStorage();
                                    this.calculateAvailableTrips();
                                    this.addOrderMarkersToMap();
                                    
                                    setTimeout(() => {
                                        this.drawRoute(trip.lat, trip.lng);
                                    }, 500);
                                    
                                    this.locationSuccess = `✅ Trajet accepté vers ${trip.to} ! Bon d'expédition généré.`;
                                    setTimeout(() => this.locationSuccess = null, 5000);
                                    this.cd.detectChanges();
                                },
                                error: (error) => {
                                    console.error('Erreur:', error);
                                    this.locationError = '❌ Erreur lors de la création';
                                    setTimeout(() => this.locationError = null, 3000);
                                }
                            });
                        },
                        error: (error) => {
                            console.error('Erreur:', error);
                            this.locationError = '❌ Erreur lors de la récupération';
                            setTimeout(() => this.locationError = null, 3000);
                        }
                    });
                },
                error: (error) => {
                    console.error('Erreur:', error);
                    this.locationError = '❌ Erreur lors de l\'acceptation';
                    setTimeout(() => this.locationError = null, 3000);
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
            
            // Mettre à jour le statut de la commande à LIVREE
            this.deliveryOrderService.updateStatut(tripId, StatutCommande.LIVREE).subscribe({
                next: () => {
                    // Mettre à jour l'expédition
                    this.shipmentService.getAll().subscribe({
                        next: (shipments: Shipment[]) => {
                            const shipment = shipments.find(s => s.deliveryOrder.idDelivery === tripId);
                            if (shipment) {
                                shipment.statut = StatutExpedition.LIVREE;
                                this.shipmentService.update(shipment.id, shipment).subscribe({
                                    next: () => {
                                        console.log('Expédition mise à jour');
                                    },
                                    error: (err) => console.error('Erreur mise à jour expédition:', err)
                                });
                            }
                        },
                        error: (err) => console.error('Erreur recherche expédition:', err)
                    });
                    
                    // MISE À JOUR LOCALE DYNAMIQUE
                    // 1. Marquer le trajet comme terminé dans acceptedTrips
                    if (this.acceptedTrips.has(tripId)) {
                        const updatedTrip = this.acceptedTrips.get(tripId);
                        updatedTrip.completed = true;
                        updatedTrip.completedAt = new Date().toISOString();
                        this.acceptedTrips.set(tripId, updatedTrip);
                    }
                    
                    // 2. Mettre à jour dans availableTrips
                    const availableTrip = this.availableTrips.find(t => t.id === tripId);
                    if (availableTrip) {
                        availableTrip.completed = true;
                        availableTrip.accepted = true;
                    }
                    
                    // 3. Réinitialiser létat actif
                    this.hasActiveTrip = false;
                    this.currentAcceptedTrip = null;
                    
                    // 4. Sauvegarde dans localStorage
                    this.saveAcceptedTripsToStorage();
                    
                    // 5. Mettre  jour l'affichage dynamiquement
                    this.calculateAvailableTrips();
                    this.addOrderMarkersToMap();
                    this.drawAllAcceptedRoutes();
                    
                    // 6. Forcer la détection des changements
                    this.cd.detectChanges();
                    
                    this.locationSuccess = `✅ Livraison terminée pour ${trip.to} ! Vous pouvez accepter de nouveaux trajets.`;
                    setTimeout(() => this.locationSuccess = null, 5000);
                },
                error: (error) => {
                    console.error('Erreur:', error);
                    this.locationError = '❌ Erreur lors de la finalisation';
                    setTimeout(() => this.locationError = null, 3000);
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
        setTimeout(() => {
            this.drawAllAcceptedRoutes();
        }, 500);
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
        if (mapContainer) {
            mapContainer.style.cursor = 'crosshair';
        }
        setTimeout(() => {
            if (this.locationSuccess === '📍 Cliquez sur la carte pour définir votre position') {
                this.locationSuccess = null;
            }
        }, 5000);
    }
    
    disableManualLocationSelection(): void {
        this.isSelectingLocation = false;
        const mapContainer = document.getElementById('mainMap');
        if (mapContainer) {
            mapContainer.style.cursor = '';
        }
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
        if (this.isTracking) {
            this.stopRealTimeTracking();
        }
        
        if (!navigator.geolocation) {
            this.locationError = '❌ GPS non supporté';
            return;
        }
        
        this.isTracking = true;
        this.locationSuccess = '📍 Suivi en temps réel activé';
        setTimeout(() => this.locationSuccess = null, 3000);
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.savePosition(position.coords.latitude, position.coords.longitude);
            },
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
            console.error('Map container not found');
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
            setTimeout(() => {
                this.drawAllAcceptedRoutes();
            }, 500);
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
        
        L.marker([this.userLat, this.userLng]).addTo(map)
            .bindPopup('<strong>📍 Votre position</strong>')
            .openPopup();
        
        L.marker([this.selectedTrip.lat, this.selectedTrip.lng]).addTo(map)
            .bindPopup(`<strong>${this.selectedTrip.to}</strong><br>
                        Client: ${this.selectedTrip.clientName}<br>
                        Adresse: ${this.selectedTrip.address}<br>
                        Distance: ${this.selectedTrip.distance} km`)
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
    }
}