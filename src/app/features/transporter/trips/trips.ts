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
    
    ngOnInit(): void {}
    
    ngAfterViewInit(): void {
        console.log('ngAfterViewInit - Initialisation de la carte');
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
    
    // ✅ GÉOLOCALISATION - Version qui fonctionne
    getUserLocation(): void {
        console.log('=== getUserLocation appelé ===');
        
        // Vérifier si le navigateur supporte la géolocalisation
        if (!navigator.geolocation) {
            this.locationError = 'Votre navigateur ne supporte pas la géolocalisation';
            this.locationSuccess = null;
            console.error('Geolocation not supported');
            return;
        }
        
        this.isLoadingLocation = true;
        this.locationError = null;
        this.locationSuccess = null;
        
        // Options de géolocalisation
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Succès
                console.log('Position obtenue:', position.coords);
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                this.isLoadingLocation = false;
                this.locationSuccess = `📍 Position trouvée ! Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                this.locationError = null;
                
                // Centrer la carte sur la position
                if (this.mainMap) {
                    this.mainMap.setView([lat, lng], 13);
                    
                    // Supprimer l'ancien marqueur
                    if (this.userMarker) {
                        this.userMarker.remove();
                    }
                    
                    // Créer une icône personnalisée
                    const userIcon = L.divIcon({
                        html: '<div style="background-color: #d4a574; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px #d4a574;"></div>',
                        iconSize: [24, 24],
                        className: 'user-marker'
                    });
                    
                    // Ajouter le marqueur
                    this.userMarker = L.marker([lat, lng], { icon: userIcon })
                        .addTo(this.mainMap)
                        .bindPopup('<strong>📍 Votre position</strong><br>Vous êtes ici !')
                        .openPopup();
                }
                
                // Effacer le message après 5 secondes
                setTimeout(() => {
                    this.locationSuccess = null;
                }, 5000);
            },
            (error) => {
                // Erreur
                console.error('Geolocation error:', error);
                this.isLoadingLocation = false;
                
                let message = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message = '❌ Accès à la position refusé. Autorisez l\'accès dans les paramètres.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = '❌ Position indisponible. Vérifiez votre connexion GPS.';
                        break;
                    case error.TIMEOUT:
                        message = '❌ Délai dépassé. Réessayez dans une zone avec meilleure couverture.';
                        break;
                    default:
                        message = '❌ Erreur de géolocalisation.';
                        break;
                }
                this.locationError = message;
                this.locationSuccess = null;
                
                // Effacer le message après 5 secondes
                setTimeout(() => {
                    this.locationError = null;
                }, 5000);
            },
            options
        );
    }
    
    initMainMap(): void {
        const mapContainer = document.getElementById('mainMap');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }
        
        if (typeof L === 'undefined') {
            console.error('Leaflet not loaded');
            return;
        }
        
        console.log('Initialisation de la carte...');
        
        // Centre par défaut sur la Tunisie
        this.mainMap = L.map('mainMap').setView([33.97, 9.56], 7);
        
        // Tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.mainMap);
        
        // Ajouter les marqueurs des trajets
        this.trips.forEach(trip => {
            if (trip.lat && trip.lng) {
                const marker = L.marker([trip.lat, trip.lng]).addTo(this.mainMap);
                marker.bindPopup(`
                    <div style="min-width: 150px;">
                        <strong>${trip.from} → ${trip.to}</strong><br>
                        <strong>Cargo:</strong> ${trip.cargo}<br>
                        <strong>Weight:</strong> ${trip.weight}<br>
                        <strong>Status:</strong> ${trip.status}<br>
                        <strong>Earnings:</strong> ${trip.earn} TND
                    </div>
                `);
                marker.on('click', () => {
                    this.openMapModal(trip);
                });
            }
        });
        
        console.log('Carte initialisée avec succès');
    }
    
    initRouteMap(): void {
        const mapContainer = document.getElementById('routeMap');
        if (!mapContainer || !this.selectedTrip) {
            console.error('Route map container not found');
            return;
        }
        
        if (typeof L === 'undefined') {
            console.error('Leaflet not loaded');
            return;
        }
        
        const map = L.map('routeMap').setView([this.selectedTrip.lat, this.selectedTrip.lng], 9);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Marqueur du trajet
        L.marker([this.selectedTrip.lat, this.selectedTrip.lng]).addTo(map)
            .bindPopup(`
                <strong>${this.selectedTrip.from} → ${this.selectedTrip.to}</strong><br>
                Cargo: ${this.selectedTrip.cargo}<br>
                Status: ${this.selectedTrip.status}
            `)
            .openPopup();
    }
}