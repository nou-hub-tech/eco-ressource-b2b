// core/services/livraison-ia.service.ts

import { Injectable } from '@angular/core';

export interface PredictionLivraison {
    distanceKm: number;
    tempsMinutes: number;
    tempsEnHeures: string;
    tempsArrivee: Date;
    trafic: string;
    meteo: string;
    conseil: string;
    confiance: number;
}

export interface Probleme {
    id: string;
    type: 'PANNE' | 'EMBOUTEILLAGE' | 'ACCIDENT' | 'CLIENT_ABSENT';
    description: string;
    retardMinutes: number;
    messageClient: string;
}

@Injectable({ providedIn: 'root' })
export class LivraisonIAService {
    
    // Base de données des distances réelles (chaque paire une seule fois)
    private readonly distances: { [key: string]: number } = {
        // Tunis et banlieue
        'Tunis-Ariana': 8,
        'Tunis-Ben Arous': 12,
        'Tunis-La Marsa': 15,
        'Tunis-Sidi Bou Said': 18,
        'Tunis-Manouba': 10,
        'Tunis-Mégrine': 14,
        'Tunis-Rades': 16,
        'Tunis-Hammam Lif': 20,
        
        // Grandes villes depuis Tunis
        'Tunis-Sousse': 140,
        'Tunis-Sfax': 270,
        'Tunis-Gabès': 380,
        'Tunis-Bizerte': 65,
        'Tunis-Nabeul': 85,
        'Tunis-Kairouan': 150,
        'Tunis-Béja': 95,
        'Tunis-Jendouba': 150,
        'Tunis-Le Kef': 170,
        'Tunis-Gafsa': 340,
        'Tunis-Tozeur': 430,
        'Tunis-Tataouine': 550,
        
        // Entre grandes villes
        'Sfax-Sousse': 130,
        'Sfax-Gabès': 110,
        'Sousse-Monastir': 20,
        'Sousse-Mahdia': 60,
        'Sousse-Kairouan': 50,
        'Ariana-Sousse': 145,
        'Ariana-Sfax': 275,
        'Ariana-Bizerte': 70,
        'Ben Arous-Sousse': 135,
        'Ben Arous-Sfax': 265,
        'Bizerte-Sousse': 200,
        'Nabeul-Sousse': 60,
        
        // Autres
        'Monastir-Mahdia': 45
    };
    
    constructor() {
        console.log('🤖 IA Service initialisé avec ' + Object.keys(this.distances).length + ' distances');
    }
    
    // Obtenir la distance réelle entre deux villes (gère les deux sens)
    getDistanceReelle(depart: string, arrivee: string): number {
        // Vérifier dans les deux sens
        const key = `${depart}-${arrivee}`;
        const keyInverse = `${arrivee}-${depart}`;
        
        let distance = this.distances[key] || this.distances[keyInverse];
        
        if (!distance) {
            console.warn(`⚠️ Distance non trouvée pour ${depart} → ${arrivee}, utilisation valeur par défaut: 15km`);
            distance = 15;
        }
        
        console.log(`📏 Distance ${depart} → ${arrivee}: ${distance} km`);
        return distance;
    }
    
    // Calculer le temps de trajet estimé
    getTempsTrajet(distance: number, heure: number, jour: number): number {
        // Vitesse selon distance
        let vitesse = 40;
        if (distance <= 20) vitesse = 25;
        else if (distance <= 50) vitesse = 50;
        else if (distance <= 150) vitesse = 80;
        else vitesse = 90;
        
        // Facteur trafic
        let facteurTrafic = 1.0;
        const estHeurePointe = (heure >= 7 && heure <= 9) || (heure >= 17 && heure <= 19);
        const estWeekend = jour === 5 || jour === 6;
        
        if (estHeurePointe && !estWeekend) facteurTrafic = 1.6;
        else if (heure >= 12 && heure <= 14) facteurTrafic = 1.2;
        
        let temps = (distance / vitesse) * 60 * facteurTrafic;
        
        if (distance <= 20) temps += 10;
        if (heure >= 20 || heure <= 6) temps += 5;
        
        return Math.round(temps);
    }
    
    // Prédiction complète
    predireLivraison(depart: string, arrivee: string): PredictionLivraison {
        const maintenant = new Date();
        const heure = maintenant.getHours();
        const jour = maintenant.getDay();
        
        const distance = this.getDistanceReelle(depart, arrivee);
        const tempsMinutes = this.getTempsTrajet(distance, heure, jour);
        
        let trafic = "🟢 Fluide";
        const estHeurePointe = (heure >= 7 && heure <= 9) || (heure >= 17 && heure <= 19);
        const estWeekend = jour === 5 || jour === 6;
        
        if (estHeurePointe && !estWeekend) trafic = "🔴 TRÈS DENSE";
        else if (heure >= 12 && heure <= 14) trafic = "🟡 MODÉRÉ";
        
        let meteo = "☀️ Beau temps";
        if (heure >= 18 && heure <= 20) meteo = "🌧️ Risque pluie";
        else if (heure >= 20 || heure <= 6) meteo = "🌙 Nuit";
        
        let conseil = "";
        if (distance > 100) conseil = "📦 Long trajet - Vérifiez carburant";
        else if (estHeurePointe && !estWeekend) conseil = "⚠️ Heure de pointe - Partez maintenant";
        else conseil = "✅ Conditions normales";
        
        let confiance = 85;
        if (estHeurePointe && !estWeekend) confiance = 65;
        
        const heures = Math.floor(tempsMinutes / 60);
        const minutes = tempsMinutes % 60;
        const tempsEnHeures = heures > 0 ? `${heures}h${minutes > 0 ? minutes + 'min' : ''}` : `${minutes}min`;
        
        return {
            distanceKm: distance,
            tempsMinutes: tempsMinutes,
            tempsEnHeures: tempsEnHeures,
            tempsArrivee: new Date(maintenant.getTime() + tempsMinutes * 60 * 1000),
            trafic: trafic,
            meteo: meteo,
            conseil: conseil,
            confiance: confiance
        };
    }
    
    signalerProbleme(type: string, description: string, retardEstime: number): Probleme {
        let messageClient = "";
        switch(type) {
            case 'PANNE':
                messageClient = `⚠️ Notre livreur a une panne mécanique. Votre colis arrivera avec ${retardEstime} min de retard. Désolé.`;
                break;
            case 'EMBOUTEILLAGE':
                messageClient = `🚦 Trafic dense. Votre livreur est bloqué, arrivée dans ${retardEstime} min.`;
                break;
            case 'ACCIDENT':
                messageClient = `🚨 Accident sur le trajet. Votre colis arrivera avec ${retardEstime} min de retard.`;
                break;
            case 'CLIENT_ABSENT':
                messageClient = `🏠 Vous étiez absent. Nous repasserons dans 30 minutes.`;
                break;
            default:
                messageClient = `Votre livraison est retardée d'environ ${retardEstime} minutes.`;
        }
        return {
            id: `prob_${Date.now()}`,
            type: type as any,
            description: description,
            retardMinutes: retardEstime,
            messageClient: messageClient
        };
    }
    
    envoyerNotificationClient(probleme: Probleme, clientNom: string, clientTel: string): void {
        console.log(`📱 Notification à ${clientNom} (${clientTel})`);
        console.log(`📝 Message: ${probleme.messageClient}`);
        alert(`🔔 CLIENT NOTIFIÉ\n\nÀ: ${clientNom}\nMessage: ${probleme.messageClient}`);
    }
}