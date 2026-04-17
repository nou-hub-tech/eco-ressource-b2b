import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var L: any;

@Component({
    selector: 'app-trips',
    standalone: false,
    templateUrl: './trips.html',
    styleUrls: ['./trips.css']
})
export class Trips implements OnInit, AfterViewInit {
    showModal = false;
    showMapModal = false;
    selectedTrip: any = null;
    isLoadingLocation = false;
    locationError: string | null = null;
    locationSuccess: string | null = null;
    private mainMap: any = null;
    private userMarker: any = null;
    
    trips = [
        { id:'DEL-1046', from:'Gabès',  to:'Tunis',   cargo:'Steel Offcuts 2T', weight:'2,000kg', earn:420, status:'in-transit', date:'Today', co2:'28kg', lat:33.89, lng:10.10 },
        { id:'DEL-1043', from:'Sousse', to:'Tunis',   cargo:'Aluminum Scrap 1.2T', weight:'1,200kg', earn:280, status:'pickup', date:'Today 15:00', co2:'18kg', lat:35.83, lng:10.64 },
        { id:'DEL-1044', from:'Sfax',   to:'Bizerte', cargo:'Plastic Pellets 500kg', weight:'500kg', earn:190, status:'delivered', date:'Yesterday', co2:'9kg', lat:34.74, lng:10.76 },
        { id:'DEL-1041', from:'Tunis',  to:'Nabeul',  cargo:'Cardboard 300kg', weight:'300kg', earn:110, status:'delivered', date:'Mar 12', co2:'6kg', lat:36.80, lng:10.18 },
        { id:'DEL-1038', from:'Sfax',   to:'Tunis',   cargo:'Glass Cullet 300kg', weight:'300kg', earn:95, status:'delivered', date:'Mar 10', co2:'5kg', lat:34.74, lng:10.76 },
    ];
    
    aiOpportunity = { from:'Sfax', to:'Tunis', cargo:'Empty return match — load available', earn:180 };
    
    ngOnInit(): void {
        // Configurer l'icône par défaut de Leaflet
        (window as any).L = L;
        // Fix pour les icônes Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }
    
    ngAfterViewInit(): void {
        console.log('Initialisation de la carte...');
        setTimeout(() => {
            this.initMainMap();
        }, 500);
    }
    
    openModal(): void { this.showModal = true; }
    closeModal(): void { this.showModal = false; }
    
    openMapModal(trip: any): void {
        this.selectedTrip = trip;
        this.showMapModal = true;
        setTimeout(() => this.initRouteMap(), 500);
    }
    
    closeMapModal(): void {
        this.showMapModal = false;
        this.selectedTrip = null;
    }
    
    // ✅ GÉOLOCALISATION CORRIGÉE AVEC FALLBACK IP
    getUserLocation(): void {
        console.log('=== getUserLocation appelé ===');
        
        if (!navigator.geolocation) {
            this.locationError = '❌ Votre navigateur ne supporte pas la géolocalisation';
            return;
        }
        
        this.isLoadingLocation = true;
        this.locationError = null;
        this.locationSuccess = null;
        
        // Timeout pour passer en fallback IP après 8 secondes
        const timeoutId = setTimeout(() => {
            console.log('Timeout GPS, tentative fallback IP...');
            this.getLocationByIP();
        }, 8000);
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                clearTimeout(timeoutId);
                this.handlePositionSuccess(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                clearTimeout(timeoutId);
                console.error('Erreur GPS:', error);
                
                if (error.code === 1) {
                    this.isLoadingLocation = false;
                    this.locationError = '❌ Accès refusé. Autorisez la géolocalisation dans les paramètres du site.';
                    setTimeout(() => { this.locationError = null; }, 5000);
                } else if (error.code === 3) {
                    // Timeout - on utilise le fallback IP
                    console.log('GPS Timeout, fallback IP...');
                    this.getLocationByIP();
                } else {
                    this.isLoadingLocation = false;
                    this.locationError = '❌ Position indisponible. Essayez la simulation GPS (F12 → Capteurs)';
                    setTimeout(() => { this.locationError = null; }, 5000);
                }
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
    }
    
    // Fallback : géolocalisation par IP
    getLocationByIP(): void {
        console.log('Tentative de géolocalisation par IP...');
        
        fetch('https://ipapi.co/json/')
            .then(response => {
                if (!response.ok) throw new Error('Erreur API');
                return response.json();
            })
            .then(data => {
                console.log('Position IP obtenue:', data);
                if (data.latitude && data.longitude) {
                    this.handlePositionSuccess(data.latitude, data.longitude);
                    this.locationSuccess = `📍 Position approximative (IP): ${data.city}, ${data.country_name}`;
                    setTimeout(() => { this.locationSuccess = null; }, 5000);
                } else {
                    throw new Error('Pas de coordonnées');
                }
            })
            .catch(() => {
                this.isLoadingLocation = false;
                this.locationError = '❌ Impossible de localiser. Utilisez la simulation GPS (F12 → Capteurs → Emplacement)';
                setTimeout(() => { this.locationError = null; }, 8000);
            });
    }
    
    // Traitement commun de la position
    handlePositionSuccess(lat: number, lng: number): void {
        console.log('Position obtenue:', lat, lng);
        
        this.isLoadingLocation = false;
        
        if (!this.locationSuccess) {
            this.locationSuccess = `📍 Position trouvée ! Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
            setTimeout(() => { this.locationSuccess = null; }, 5000);
        }
        
        // Centrer la carte
        if (this.mainMap) {
            this.mainMap.setView([lat, lng], 13);
            
            // Supprimer l'ancien marqueur
            if (this.userMarker) {
                this.userMarker.remove();
            }
            
            // Icône personnalisée pour l'utilisateur
            const userIcon = L.divIcon({
                html: `<div style="background-color: #d4a574; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px #d4a574; animation: pulse 1.5s infinite;"></div>`,
                iconSize: [24, 24],
                className: 'user-marker'
            });
            
            this.userMarker = L.marker([lat, lng], { icon: userIcon })
                .addTo(this.mainMap)
                .bindPopup('<strong>📍 Votre position</strong>')
                .openPopup();
        } else {
            console.error('Carte non trouvée');
            this.locationError = '⚠️ Carte non initialisée, rechargez la page';
            setTimeout(() => { this.locationError = null; }, 5000);
        }
    }
    
    initMainMap(): void {
        const mapContainer = document.getElementById('mainMap');
        if (!mapContainer || typeof L === 'undefined') {
            console.error('Map container or Leaflet not found');
            return;
        }
        
        // Créer la carte centrée sur la Tunisie
        this.mainMap = L.map('mainMap').setView([33.97, 9.56], 7);
        
        // Tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.mainMap);
        
        // Ajouter les marqueurs des trajets
        this.trips.forEach(trip => {
            if (trip.lat && trip.lng) {
                const marker = L.marker([trip.lat, trip.lng]).addTo(this.mainMap);
                marker.bindPopup(`
                    <strong>${trip.from} → ${trip.to}</strong><br>
                    Cargo: ${trip.cargo}<br>
                    Status: ${trip.status}<br>
                    Earnings: ${trip.earn} TND
                `);
                marker.on('click', () => this.openMapModal(trip));
            }
        });
        
        console.log('Carte initialisée avec succès');
    }
    
    initRouteMap(): void {
        const mapContainer = document.getElementById('routeMap');
        if (!mapContainer || !this.selectedTrip || typeof L === 'undefined') return;
        
        // Vérifier si la carte existe déjà et la détruire
        if ((mapContainer as any)._leaflet_id) {
            const existingMap = (window as any).routeMap;
            if (existingMap) existingMap.remove();
        }
        
        const map = L.map('routeMap').setView([this.selectedTrip.lat, this.selectedTrip.lng], 9);
        (window as any).routeMap = map;
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
        
        L.marker([this.selectedTrip.lat, this.selectedTrip.lng]).addTo(map)
            .bindPopup(`<strong>${this.selectedTrip.from} → ${this.selectedTrip.to}</strong><br>
                        Cargo: ${this.selectedTrip.cargo}<br>
                        Poids: ${this.selectedTrip.weight}<br>
                        Gain: ${this.selectedTrip.earn} TND`)
            .openPopup();
    }
}