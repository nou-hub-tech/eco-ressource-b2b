import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

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
    isTracking = false;  // ✅ RENDU PUBLIC (supprimé "private")
    
    trips = [
        { id:'DEL-1046', from:'Gabès',  to:'Tunis',   cargo:'Steel Offcuts 2T', weight:'2,000kg', earn:420, status:'in-transit', date:'Today', co2:'28kg', lat:33.89, lng:10.10 },
        { id:'DEL-1043', from:'Sousse', to:'Tunis',   cargo:'Aluminum Scrap 1.2T', weight:'1,200kg', earn:280, status:'pickup', date:'Today 15:00', co2:'18kg', lat:35.83, lng:10.64 },
        { id:'DEL-1044', from:'Sfax',   to:'Bizerte', cargo:'Plastic Pellets 500kg', weight:'500kg', earn:190, status:'delivered', date:'Yesterday', co2:'9kg', lat:34.74, lng:10.76 },
        { id:'DEL-1041', from:'Tunis',  to:'Nabeul',  cargo:'Cardboard 300kg', weight:'300kg', earn:110, status:'delivered', date:'Mar 12', co2:'6kg', lat:36.80, lng:10.18 },
        { id:'DEL-1038', from:'Sfax',   to:'Tunis',   cargo:'Glass Cullet 300kg', weight:'300kg', earn:95, status:'delivered', date:'Mar 10', co2:'5kg', lat:34.74, lng:10.76 },
    ];
    
    aiOpportunity = { from:'Sfax', to:'Tunis', cargo:'Empty return match — load available', earn:180 };
    
    ngOnInit(): void {
        (window as any).L = L;
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
    
    // ✅ MÉTHODE DYNAMIQUE - Force la demande d'autorisation
    getUserLocation(): void {
        console.log('=== getUserLocation appelé ===');
        
        if (!navigator.geolocation) {
            this.locationError = '❌ Votre navigateur ne supporte pas la géolocalisation';
            return;
        }
        
        this.isLoadingLocation = true;
        this.locationError = null;
        this.locationSuccess = null;
        
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.handlePositionSuccess(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error('Erreur GPS:', error);
                
                if (error.code === 1) {
                    this.isLoadingLocation = false;
                    this.locationError = '🔒 Localisation bloquée. Cliquez sur le cadenas dans la barre d\'adresse et autorisez.';
                    this.showPermissionDialog();
                } else if (error.code === 2) {
                    this.isLoadingLocation = false;
                    this.locationError = '📡 Position indisponible. Vérifiez votre connexion WiFi.';
                    setTimeout(() => { this.locationError = null; }, 5000);
                } else if (error.code === 3) {
                    this.isLoadingLocation = false;
                    this.locationError = '⏱️ Délai dépassé. Nouvelle tentative...';
                    setTimeout(() => {
                        this.getUserLocation();
                    }, 2000);
                }
            },
            options
        );
    }
    
    // ✅ Dialogue personnalisé
    showPermissionDialog(): void {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 400px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                <div style="font-size: 48px; margin-bottom: 16px;">📍</div>
                <h3 style="margin: 0 0 8px 0; color: #212529;">Accès à la position requis</h3>
                <p style="color: #6c757d; margin-bottom: 20px;">
                    Pour vous localiser sur la carte, nous avons besoin d'accéder à votre position.
                </p>
                <div style="background: #f8f9fa; border-radius: 12px; padding: 12px; margin-bottom: 20px; text-align: left;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold;">🔧 Comment autoriser :</p>
                    <p style="margin: 0 0 4px 0; font-size: 12px;">1. Cliquez sur le 🔒 <strong>cadenas</strong> dans la barre d'adresse</p>
                    <p style="margin: 0 0 4px 0; font-size: 12px;">2. Trouvez <strong>"Localisation"</strong> ou <strong>"Géolocalisation"</strong></p>
                    <p style="margin: 0; font-size: 12px;">3. Changez de <strong>"Bloquer"</strong> à <strong>"Autoriser"</strong></p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button id="cancel-permission" style="flex: 1; padding: 10px; border: 1px solid #dee2e6; background: white; border-radius: 8px; cursor: pointer;">Annuler</button>
                    <button id="retry-permission" style="flex: 1; padding: 10px; background: #d4a574; color: white; border: none; border-radius: 8px; cursor: pointer;">J'ai autorisé, réessayer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('cancel-permission')?.addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('retry-permission')?.addEventListener('click', () => {
            modal.remove();
            setTimeout(() => {
                this.getUserLocation();
            }, 500);
        });
    }
    
    // ✅ Suivi en temps réel
    startRealTimeTracking(): void {
        if (this.isTracking) {
            this.stopRealTimeTracking();
        }
        
        this.isTracking = true;
        this.locationSuccess = '📍 Suivi en temps réel activé';
        setTimeout(() => { this.locationSuccess = null; }, 3000);
        
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                if (this.mainMap) {
                    this.mainMap.setView([lat, lng], 15);
                    
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
                            .bindPopup('<strong>📍 Votre position (temps réel)</strong>')
                            .openPopup();
                    }
                }
                
                console.log('Position mise à jour:', lat, lng);
            },
            (error) => {
                console.error('Erreur suivi:', error);
                this.stopRealTimeTracking();
                this.locationError = '❌ Suivi interrompu';
                setTimeout(() => { this.locationError = null; }, 3000);
            },
            options
        );
    }
    
    stopRealTimeTracking(): void {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        this.isTracking = false;
        this.locationSuccess = '⏹️ Suivi en temps réel arrêté';
        setTimeout(() => { this.locationSuccess = null; }, 3000);
    }
    
    // Traitement commun de la position
    handlePositionSuccess(lat: number, lng: number): void {
        console.log('Position obtenue:', lat, lng);
        
        this.isLoadingLocation = false;
        this.locationSuccess = `📍 Position trouvée ! Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        setTimeout(() => { this.locationSuccess = null; }, 5000);
        
        if (this.mainMap) {
            this.mainMap.setView([lat, lng], 13);
            
            if (this.userMarker) {
                this.userMarker.remove();
            }
            
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
    
    initMainMap(): void {
        const mapContainer = document.getElementById('mainMap');
        if (!mapContainer || typeof L === 'undefined') {
            console.error('Map container or Leaflet not found');
            return;
        }
        
        this.mainMap = L.map('mainMap').setView([33.97, 9.56], 7);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.mainMap);
        
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
    
    ngOnDestroy(): void {
        this.stopRealTimeTracking();
    }
}