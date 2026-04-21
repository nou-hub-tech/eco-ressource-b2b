import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { DeliveryOrder } from '../../../core/models/delivery-order';
import { StatutCommande } from '../../../core/models/statut';

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
    isLoadingTrips = false;
    
    constructor(
        private deliveryOrderService: DeliveryOrderService
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
        this.loadDeliveryOrders();
    }
    
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initMainMap();
        }, 500);
    }
    
    // ======== CALCUL DE DISTANCE ==========
    
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
    
    // ========== CHARGEMENT DES COMMANDES ==========
    
    loadDeliveryOrders(): void {
        console.log('Chargement des commandes...');
        this.isLoadingTrips = true;
        
        this.deliveryOrderService.getAll().subscribe({
            next: (orders: DeliveryOrder[]) => {
                console.log('Commandes reçues:', orders);
                console.log('Nombre de commandes:', orders.length);
                this.deliveryOrders = orders;
                this.calculateAvailableTrips();
                this.isLoadingTrips = false;
            },
            error: (error) => {
                console.error('Erreur détaillée:', error);
                this.locationError = 'Erreur de chargement des commandes';
                this.isLoadingTrips = false;
                setTimeout(() => this.locationError = null, 5000);
            }
        });
    }
    
    calculateAvailableTrips(): void {
        console.log('Calcul des trajets disponibles...');
        console.log('Position utilisateur:', this.userLat, this.userLng);
        
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
            'Kairouan': { lat: 35.6781, lng: 10.0964 },
            'Médenine': { lat: 33.3545, lng: 10.5055 },
            'Gafsa': { lat: 34.4250, lng: 8.7842 },
            'Monastir': { lat: 35.7780, lng: 10.8260 },
            'Ben Arous': { lat: 36.7532, lng: 10.2187 },
            'Ariana': { lat: 36.8601, lng: 10.1934 },
            'Manouba': { lat: 36.8078, lng: 10.0956 },
            'Zaghouan': { lat: 36.4029, lng: 10.1427 },
            'Béja': { lat: 36.7256, lng: 9.1817 },
            'Jendouba': { lat: 36.5015, lng: 8.7802 },
            'Le Kef': { lat: 36.1742, lng: 8.7049 },
            'Siliana': { lat: 36.0850, lng: 9.3708 },
            'Kasserine': { lat: 35.1676, lng: 8.8365 },
            'Tozeur': { lat: 33.9197, lng: 8.1335 },
            'Kebili': { lat: 33.7044, lng: 8.9690 },
            'Tataouine': { lat: 32.9297, lng: 10.4518 }
        };
        
        this.deliveryOrders.forEach(order => {
            console.log('Traitement commande:', order.idDelivery, 'Statut:', order.statut);
            
            // Ne garder que les commandes non livrées
            if (order.statut !== StatutCommande.LIVREE) {
                let cityLat: number | null = null;
                let cityLng: number | null = null;
                let cityName = '';
                
                // Chercher la ville dans l'adresse
                for (const [city, coords] of Object.entries(tunisiaCities)) {
                    if (order.adresseLivraison && order.adresseLivraison.toLowerCase().includes(city.toLowerCase())) {
                        cityLat = coords.lat;
                        cityLng = coords.lng;
                        cityName = city;
                        break;
                    }
                }
                
                // Si ville non trouvée, chercher dans le nom du client ou utiliser Tunis
                if (!cityLat) {
                    cityLat = 36.8065;
                    cityLng = 10.1815;
                    cityName = 'Tunis';
                    console.log('Ville non trouvée pour:', order.adresseLivraison, 'utilisation Tunis');
                }
                
                const distance = this.calculateDistance(this.userLat, this.userLng, cityLat, cityLng);
                const co2 = Math.round(distance * 0.2);
                const earnings = Math.round(distance * 3 + 50);
                
                console.log('Trajet ajouté:', cityName, 'distance:', distance, 'km');
                
                this.availableTrips.push({
                    id: order.idDelivery,
                    from: this.getCurrentCityName(),
                    to: cityName,
                    cargo: 'Marchandise',
                    weight: 'N/A',
                    co2: co2 + ' kg',
                    earn: earnings,
                    status: order.statut,
                    date: order.datePrevue || new Date(),
                    lat: cityLat,
                    lng: cityLng,
                    address: order.adresseLivraison,
                    clientName: order.nomClient,
                    telephone: order.telephoneClient,
                    distance: distance,
                    order: order
                });
            }
        });
        
        // Trier par distance
        this.availableTrips.sort((a, b) => a.distance - b.distance);
        console.log('Total trajets disponibles:', this.availableTrips.length);
    }
    
    getCurrentCityName(): string {
        const cities = [
            { name: 'Tunis', lat: 36.8065, lng: 10.1815, radius: 30 },
            { name: 'Sfax', lat: 34.7406, lng: 10.7603, radius: 30 },
            { name: 'Sousse', lat: 35.8256, lng: 10.6367, radius: 30 },
            { name: 'Bizerte', lat: 37.2744, lng: 9.8739, radius: 30 },
            { name: 'Gabès', lat: 33.8815, lng: 10.0982, radius: 30 }
        ];
        
        for (const city of cities) {
            const dist = this.calculateDistance(this.userLat, this.userLng, city.lat, city.lng);
            if (dist < city.radius) {
                return city.name;
            }
        }
        return 'Ma position';
    }
    
    // ========== ACTIONS ==========
    
    acceptTrip(trip: any): void {
        if (confirm(`Accepter le trajet vers ${trip.to} (${trip.distance} km) ?`)) {
            this.deliveryOrderService.updateStatut(trip.id, StatutCommande.EN_COURS).subscribe({
                next: () => {
                    this.locationSuccess = `✅ Trajet accepté vers ${trip.to} ! Gain: ${trip.earn} TND`;
                    setTimeout(() => this.locationSuccess = null, 5000);
                    this.loadDeliveryOrders();
                },
                error: (error) => {
                    console.error('Erreur:', error);
                    this.locationError = '❌ Erreur lors de l\'acceptation';
                    setTimeout(() => this.locationError = null, 3000);
                }
            });
        }
    }
    
    refuseTrip(trip: any): void {
        if (confirm(`Refuser le trajet vers ${trip.to} ?`)) {
            this.locationSuccess = `❌ Trajet vers ${trip.to} refusé`;
            setTimeout(() => this.locationSuccess = null, 3000);
            const index = this.availableTrips.indexOf(trip);
            if (index > -1) {
                this.availableTrips.splice(index, 1);
            }
        }
    }
    
    // ========== GESTION DE LA POSITION ==========
    
    savePosition(lat: number, lng: number): void {
        this.userLat = lat;
        this.userLng = lng;
        localStorage.setItem('userLat', lat.toString());
        localStorage.setItem('userLng', lng.toString());
        this.calculateAvailableTrips();
    }
    
    loadSavedPosition(): void {
        const savedLat = localStorage.getItem('userLat');
        const savedLng = localStorage.getItem('userLng');
        
        if (savedLat && savedLng) {
            this.userLat = parseFloat(savedLat);
            this.userLng = parseFloat(savedLng);
            setTimeout(() => {
                if (this.mainMap) {
                    this.updateMapPosition(this.userLat, this.userLng);
                }
            }, 1000);
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
            this.locationError = '❌ GPS non supporté. Utilisez "Manuel"';
            this.enableManualLocationSelection();
            return;
        }
        
        this.isLoadingLocation = true;
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.savePosition(position.coords.latitude, position.coords.longitude);
                this.updateMapPosition(position.coords.latitude, position.coords.longitude);
                this.locationSuccess = '📍 Position GPS trouvée !';
                setTimeout(() => this.locationSuccess = null, 5000);
                this.isLoadingLocation = false;
            },
            (error) => {
                console.error('Erreur GPS:', error);
                this.isLoadingLocation = false;
                this.locationError = '❌ GPS indisponible, utilisez "Manuel"';
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
                this.updateMapPosition(position.coords.latitude, position.coords.longitude);
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
            this.mainMap.setView([lat, lng], 13);
            
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
                this.updateMapPosition(e.latlng.lat, e.latlng.lng);
                this.disableManualLocationSelection();
                this.locationSuccess = '📍 Position manuelle définie !';
                setTimeout(() => this.locationSuccess = null, 3000);
            }
        });
        
        this.updateMapPosition(this.userLat, this.userLng);
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
                        Distance: ${this.selectedTrip.distance} km<br>
                        Gain: ${this.selectedTrip.earn} TND`)
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