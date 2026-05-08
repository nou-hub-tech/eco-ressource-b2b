# Eco Ressource B2B

Eco Ressource B2B est une application web Angular dediee a la gestion et a la valorisation des ressources entre entreprises. La plateforme centralise les annonces, les stocks, les reservations, les livraisons, les transactions et les evenements afin de faciliter les echanges B2B dans une logique d'economie circulaire.

Le projet propose des espaces separes selon le profil utilisateur : entreprise, transporteur et administrateur. Chaque role dispose d'un tableau de bord et de fonctionnalites adaptees a ses besoins operationnels.

## Objectifs du projet

- Mettre en relation les entreprises autour de ressources, produits ou stocks disponibles.
- Simplifier la publication, la recherche et la gestion des annonces.
- Suivre les stocks, les inventaires, les mouvements et les produits.
- Organiser les reservations, les commandes et les livraisons.
- Donner aux transporteurs un espace pour suivre les trajets, expeditions, bons de livraison et revenus.
- Offrir a l'administrateur une vision globale sur les utilisateurs, annonces, stocks, livraisons, reservations, finances, evenements et actions de solidarite.

## Fonctionnalites principales

### Espace entreprise

- Tableau de bord entreprise.
- Marketplace pour consulter les annonces disponibles.
- Gestion des annonces, demandes, produits, stocks et inventaires.
- Suivi des reservations, livraisons, reclamations et transactions.
- Generation de rapports et consultation des indicateurs financiers.
- Modules complementaires : recherche de produits, chatbot de marche, factures, tresorerie, evenements et solidarite.

### Espace transporteur

- Tableau de bord transporteur.
- Gestion des trajets et expeditions.
- Consultation des bons de livraison.
- Suivi des revenus.

### Espace administrateur

- Gestion des utilisateurs.
- Supervision des annonces, stocks, produits et mouvements de stock.
- Suivi des livraisons, expeditions et reservations.
- Gestion de la tresorerie, des evenements et des actions solidaires.
- Acces aux outils de statistiques, detection de produits endommages, scan d'inventaire et chatbot.

## Technologies utilisees

- Angular 21
- TypeScript
- RxJS
- Angular Router
- Angular Forms et Reactive Forms
- Angular Material et Angular CDK
- Bootstrap et Bootstrap Icons
- Tailwind CSS
- Chart.js, ApexCharts et ng-apexcharts
- FullCalendar
- Leaflet pour les cartes
- jsPDF, html2canvas et xlsx pour l'export de documents
- SockJS et STOMP pour les fonctionnalites temps reel
- QRCode, JsBarcode et Quagga2 pour les QR codes, codes-barres et scans

## Structure du projet

```text
src/
  app/
    core/          Services, modeles, guards et interceptors
    shared/        Composants partages, layout, sidebar, header et outils communs
    features/      Modules fonctionnels par domaine et par role
    components/    Composants reutilisables metier
  assets/          Images et ressources statiques
  environments/    Configuration des environnements
diagrams/          Diagrammes UML du projet
```

## Diagrammes

### Diagramme de cas d'utilisation final

![Diagramme de cas d'utilisation final](diagrams/uc%20final.jpg)

### Diagramme de classes final

![Diagramme de classes final](diagrams/dc%20final.png)

## Installation

Installez les dependances du projet :

```bash
npm install
```

## Lancement en developpement

Pour demarrer le serveur local :

```bash
npm start
```

L'application sera disponible a l'adresse :

```text
http://localhost:4200/
```

Pour lancer l'application sur le reseau local :

```bash
npm run start:lan
```

## Build

Pour compiler le projet :

```bash
npm run build
```

Les fichiers generes seront places dans le dossier `dist/`.

## Tests

Pour executer les tests :

```bash
npm test
```

## Notes

Le frontend communique avec un backend via des services HTTP situes principalement dans `src/app/core/services`. Les fichiers `proxy.conf.js` et `proxy.conf.json` permettent de configurer le proxy de developpement lorsque l'API backend est lancee localement.
