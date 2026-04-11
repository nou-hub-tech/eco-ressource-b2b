# Specification Frontend Angular — Module Gestion Annonces / Posts

Ce fichier est la source de verite pour generer le code Angular du module Gestion Annonces/Posts.
Il decrit TOUS les endpoints, DTOs, contraintes, validations et fonctionnalites a implementer.

---

## 1. Informations Techniques Backend

- **Backend** : Spring Boot 3.2.5, Java 17
- **Base URL** : `http://localhost:8080`
- **Auth** : JWT Bearer Token dans le header `Authorization: Bearer <token>`
- **CORS** : autorise `http://localhost:4200` (Angular dev server)
- **Format dates** : ISO 8601 (`2026-04-09T15:30:00`)
- **Swagger UI** : `http://localhost:8080/swagger-ui/index.html`
- **Erreurs** : toutes retournees en JSON format `ErrorResponse`

### Format des erreurs backend (toujours JSON)

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "The seller cannot join their own group",
  "timestamp": "2026-04-09T15:30:00"
}
```

```json
{
  "status": 400,
  "error": "Validation Failed",
  "message": "title: Le titre est obligatoire, quantity: La quantite doit etre strictement positive",
  "timestamp": "2026-04-09T15:30:00"
}
```

---

## 2. Authentification

### POST /api/auth/login

```json
// Request
{ "email": "slim@entreprise.tn", "password": "demo123" }

// Response 200
{ "token": "eyJhbGciOiJIUzI1NiJ9...", "email": "slim@entreprise.tn", "role": "ROLE_ENTERPRISE" }
```

### POST /api/auth/register

```json
// Request
{
  "email": "user@test.tn",
  "password": "pass123",
  "fullName": "Test User",
  "role": "ROLE_ENTERPRISE",
  "companyName": "Test SARL",
  "sector": "Recyclage",
  "taxId": "TN789"
}

// Response 201
{ "token": "eyJhbGciOiJIUzI1NiJ9...", "email": "user@test.tn", "role": "ROLE_ENTERPRISE" }
```

### Roles disponibles
- `ROLE_ADMIN`
- `ROLE_ENTERPRISE`
- `ROLE_TRANSPORTER`

### Comptes de test precharges
| Email | Password | Role |
|---|---|---|
| admin@marketplace.com | admin123 | ROLE_ADMIN |
| slim@entreprise.tn | demo123 | ROLE_ENTERPRISE |
| karim@transport.tn | demo123 | ROLE_TRANSPORTER |

### Implementation Angular requise
- Service `AuthService` avec login/register/logout
- Stockage du token JWT dans `localStorage`
- `HttpInterceptor` qui ajoute `Authorization: Bearer <token>` a chaque requete
- `AuthGuard` pour proteger les routes
- Redirection vers login si 401

---

## 3. Enums (a reproduire en TypeScript)

```typescript
export type ListingType = 'SURPLUS' | 'DEMANDE' | 'GROUP_BUYING';

export type ResourceListingStatus = 'ACTIVE' | 'CLOSED' | 'EXPIRED' | 'CANCELLED';

export type GroupPurchaseStatus = 'OPEN' | 'FULL' | 'SUCCESS' | 'FAILED' | 'CLOSED';
```

---

## 4. Interfaces TypeScript (correspondance exacte avec les DTOs backend)

```typescript
// === ANNONCES ===

export interface CreateListingRequest {
  title: string;                    // obligatoire, 3-255 chars
  description: string;              // obligatoire, 10-2000 chars
  type: ListingType;                // obligatoire: 'SURPLUS' | 'DEMANDE' | 'GROUP_BUYING'
  quantity: number;                 // obligatoire, > 0
  unit: string;                     // obligatoire
  price?: number;                   // optionnel, >= 0
  location?: string;                // optionnel
  latitude?: number;                // optionnel, -90 a 90
  longitude?: number;               // optionnel, -180 a 180
  productId: number;                // obligatoire (produit existant)
  companyId: number;                // obligatoire (entreprise du user connecte)
  attachmentUrls?: string[];        // optionnel, liste d'URLs images
  targetQuantity?: number;          // obligatoire si type = GROUP_BUYING, > 0
  deadline?: string;                // obligatoire si type = GROUP_BUYING, ISO datetime futur
}

export interface ListingResponse {
  id: number;
  title: string;
  description: string;
  type: ListingType;
  status: ResourceListingStatus;
  quantity: number;
  unit: string;
  price: number | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  productId: number;
  productName: string;
  productCategory: string;
  companyId: number;
  createdAt: string;                // ISO datetime
  attachmentUrls: string[];
  groupPurchase: GroupPurchaseResponse | null;
  favoriteCount: number;
  commentCount: number;
}

// === COMMENTAIRES ===

export interface CreateCommentRequest {
  content: string;                  // obligatoire, 1-2000 chars
  parentId?: number | null;         // optionnel, pour repondre a un commentaire
}

export interface CommentResponse {
  id: number;
  content: string;
  userId: number;
  userFullName: string;
  listingId: number;
  parentId: number | null;
  createdAt: string;
  replies: CommentResponse[];       // arbre recursif des reponses
}

// === GROUP BUYING ===

export interface JoinGroupRequest {
  quantity: number;                 // obligatoire, > 0
  companyId: number;                // obligatoire
}

export interface GroupPurchaseResponse {
  id: number;
  listingId: number;
  targetQuantity: number;
  currentQuantity: number;
  remainingQuantity: number;        // = targetQuantity - currentQuantity
  deadline: string;                 // ISO datetime
  status: GroupPurchaseStatus;
  participants: ParticipantInfo[];
}

export interface ParticipantInfo {
  id: number;
  companyId: number;
  quantity: number;
}

// === FAVORIS ===

export interface FavoriteResponse {
  id: number;
  userId: number;
  listingId: number;
  listingTitle: string;
}

// === PRODUITS ===

export interface Product {
  idProduct: number;
  name: string;
  category: string | null;
  description: string | null;
  image: string | null;
  materialType: string | null;
  recyclable: boolean;
  companyId: number | null;
}

export interface ProductRequest {
  name: string;                     // obligatoire, 2-255 chars
  category?: string;
  description?: string;             // max 1000 chars
  image?: string;
  materialType?: string;
  recyclable: boolean;              // obligatoire
  companyId?: number;
}

// === STOCK ===

export interface StockItem {
  idStock: number;
  companyId: number | null;
  itemCondition: string | null;
  expirationDate: string | null;    // ISO date (YYYY-MM-DD)
  image: string | null;
  location: string | null;
  quantity: number;
  status: string | null;
  unit: string | null;
  product: Product | null;
  unitPrice: number;
}

export interface StockItemRequest {
  companyId?: number;
  itemCondition?: string;
  expirationDate?: string;          // ISO date
  image?: string;
  location?: string;
  quantity: number;                  // obligatoire, > 0
  status?: string;
  unit?: string;
  idProduct?: number;
  unitPrice: number;                // obligatoire, >= 0
}

export interface StockMovement {
  id: number;
  description: string | null;
  movementDate: string | null;      // ISO datetime
  movementType: string | null;      // 'IN' | 'OUT' | 'UPDATE'
  quantity: number;
  stockItem: StockItem | null;
}

export interface StockMovementRequest {
  description?: string;
  movementDate?: string;            // ISO datetime
  movementType?: string;            // 'IN' | 'OUT' | 'UPDATE'
  quantity: number;                  // obligatoire, > 0
  idStock?: number;
}

// === ERREUR ===

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  timestamp: string;
}
```

---

## 5. API Endpoints Complets

### 5.1 Resource Listings (Annonces)

| Methode | URL | Body | Reponse | Auth |
|---|---|---|---|---|
| POST | `/api/resource-listings` | `CreateListingRequest` | `ListingResponse` (201) | Oui |
| GET | `/api/resource-listings` | — | `ListingResponse[]` (200) | Oui |
| GET | `/api/resource-listings/{id}` | — | `ListingResponse` (200) | Oui |
| GET | `/api/resource-listings/search?type=&category=&location=&maxPrice=` | — | `ListingResponse[]` (200) | Oui |
| PUT | `/api/resource-listings/{id}?companyId={companyId}` | `CreateListingRequest` | `ListingResponse` (200) | Oui |
| POST | `/api/resource-listings/{id}/duplicate` | — | `ListingResponse` (201) | Oui |
| PUT | `/api/resource-listings/{id}/cancel?companyId={companyId}` | — | `void` (204) | Oui |

### 5.2 Comments

| Methode | URL | Body | Reponse | Auth |
|---|---|---|---|---|
| POST | `/api/resource-listings/{listingId}/comments` | `CreateCommentRequest` | `CommentResponse` (201) | Oui (user auto-detecte) |
| GET | `/api/resource-listings/{listingId}/comments` | — | `CommentResponse[]` (200) | Oui |
| PUT | `/api/comments/{commentId}` | `CreateCommentRequest` | `CommentResponse` (200) | Oui (owner only) |
| DELETE | `/api/comments/{commentId}` | — | `void` (204) | Oui (owner ou admin) |

### 5.3 Group Buying

| Methode | URL | Body | Reponse | Auth |
|---|---|---|---|---|
| GET | `/api/groups/{id}` | — | `GroupPurchaseResponse` (200) | Oui |
| POST | `/api/groups/{id}/join` | `JoinGroupRequest` | `GroupPurchaseResponse` (201) | Oui |
| DELETE | `/api/groups/{id}/leave?companyId={companyId}` | — | `GroupPurchaseResponse` (200) | Oui |
| GET | `/api/groups/{id}/participants` | — | `ParticipantInfo[]` (200) | Oui |

### 5.4 Favorites

| Methode | URL | Body | Reponse | Auth |
|---|---|---|---|---|
| POST | `/api/resource-listings/{listingId}/favorite` | — | `FavoriteResponse` (201) | Oui (user auto-detecte) |
| DELETE | `/api/resource-listings/{listingId}/favorite` | — | `void` (204) | Oui (user auto-detecte) |
| GET | `/api/favorites/me` | — | `FavoriteResponse[]` (200) | Oui |

### 5.5 Products

| Methode | URL | Body | Reponse | Auth |
|---|---|---|---|---|
| GET | `/api/products` | — | `Product[]` (200) | Oui |
| GET | `/api/products?category={cat}` | — | `Product[]` (200) | Oui |
| GET | `/api/products/{id}` | — | `Product` (200) | Oui |
| POST | `/api/products` | `ProductRequest` | `Product` (201) | Oui |
| PUT | `/api/products/{id}` | `ProductRequest` | `Product` (200) | Oui |
| DELETE | `/api/products/{id}` | — | `void` (204) | Oui |

### 5.6 Stock Items

| Methode | URL | Body | Reponse | Auth |
|---|---|---|---|---|
| GET | `/api/stock-items` | — | `StockItem[]` (200) | Oui |
| GET | `/api/stock-items?productId={id}` | — | `StockItem[]` (200) | Oui |
| GET | `/api/stock-items?companyId={id}` | — | `StockItem[]` (200) | Oui |
| GET | `/api/stock-items/{id}` | — | `StockItem` (200) | Oui |
| POST | `/api/stock-items` | `StockItemRequest` | `StockItem` (201) | Oui |
| PUT | `/api/stock-items/{id}` | `StockItemRequest` | `StockItem` (200) | Oui |
| DELETE | `/api/stock-items/{id}` | — | `void` (204) | Oui |

### 5.7 Stock Movements

| Methode | URL | Body | Reponse | Auth |
|---|---|---|---|---|
| GET | `/api/stock-movements` | — | `StockMovement[]` (200) | Oui |
| GET | `/api/stock-movements?stockItemId={id}` | — | `StockMovement[]` (200) | Oui |
| GET | `/api/stock-movements/{id}` | — | `StockMovement` (200) | Oui |
| POST | `/api/stock-movements` | `StockMovementRequest` | `StockMovement` (201) | Oui |
| PUT | `/api/stock-movements/{id}` | `StockMovementRequest` | `StockMovement` (200) | Oui |
| DELETE | `/api/stock-movements/{id}` | — | `void` (204) | Oui |

---

## 6. Controles de Saisie Frontend (Validations Formulaires)

### 6.1 Formulaire Creation/Modification Annonce

| Champ | Type HTML | Obligatoire | Validation |
|---|---|---|---|
| title | input text | Oui | min 3 chars, max 255 chars |
| description | textarea | Oui | min 10 chars, max 2000 chars |
| type | select/radio | Oui | SURPLUS, DEMANDE, GROUP_BUYING |
| quantity | input number | Oui | entier > 0 |
| unit | input text | Oui | non vide (ex: kg, tonnes, pieces) |
| price | input number | Non | decimal >= 0 |
| location | input text | Non | texte libre |
| latitude | input number (cache) | Non | -90 a 90 |
| longitude | input number (cache) | Non | -180 a 180 |
| productId | select (dropdown) | Oui | doit exister dans la liste des produits |
| companyId | auto (user connecte) | Oui | rempli automatiquement depuis le profil |
| attachmentUrls | file upload multiple | Non | jpg, jpeg, png, webp, pdf |
| targetQuantity | input number | Si GROUP_BUYING | entier > 0 |
| deadline | datetime-local | Si GROUP_BUYING | doit etre dans le futur |

**Regles dynamiques :**
- Si type = GROUP_BUYING : afficher les champs `targetQuantity` et `deadline` et les rendre obligatoires
- Si type = SURPLUS ou DEMANDE : masquer `targetQuantity` et `deadline`
- Desactiver le bouton Publier si le formulaire est invalide
- Afficher un recapitulatif avant soumission

### 6.2 Formulaire Commentaire

| Champ | Type HTML | Obligatoire | Validation |
|---|---|---|---|
| content | textarea | Oui | min 1 char, max 2000 chars |
| parentId | cache | Non | rempli automatiquement si on clique Repondre |

**Regles :**
- Interdire l'envoi si le champ est vide ou contient uniquement des espaces
- Anti-spam : desactiver le bouton 3 secondes apres chaque envoi cote frontend
- Si anti-spam backend (3 en 30s), afficher le message d'erreur retourne

### 6.3 Formulaire Rejoindre un Groupe

| Champ | Type HTML | Obligatoire | Validation |
|---|---|---|---|
| quantity | input number | Oui | entier > 0, <= remainingQuantity du groupe |
| companyId | auto | Oui | rempli automatiquement |

**Regles :**
- Afficher la quantite restante disponible
- Bloquer si quantity > remainingQuantity
- Bloquer si le groupe n'est plus OPEN
- Bloquer si l'utilisateur est le vendeur (companyId du listing)
- Afficher un message clair si deja participant

### 6.4 Formulaire Produit

| Champ | Type HTML | Obligatoire | Validation |
|---|---|---|---|
| name | input text | Oui | min 2 chars, max 255 chars |
| category | input text | Non | |
| description | textarea | Non | max 1000 chars |
| image | input text/file | Non | URL ou upload |
| materialType | input text | Non | |
| recyclable | checkbox/toggle | Oui | boolean |
| companyId | auto ou input | Non | |

### 6.5 Formulaire Stock Item

| Champ | Type HTML | Obligatoire | Validation |
|---|---|---|---|
| quantity | input number | Oui | entier > 0 |
| unitPrice | input number | Oui | decimal >= 0 |
| companyId | input number | Non | |
| itemCondition | input text | Non | |
| expirationDate | input date | Non | format YYYY-MM-DD |
| image | input text | Non | |
| location | input text | Non | |
| status | input text/select | Non | |
| unit | input text | Non | |
| idProduct | select dropdown | Non | liste des produits existants |

### 6.6 Formulaire Stock Movement

| Champ | Type HTML | Obligatoire | Validation |
|---|---|---|---|
| quantity | input number | Oui | entier > 0 |
| movementType | select | Non | IN, OUT, UPDATE |
| description | input text | Non | |
| movementDate | datetime-local | Non | ISO datetime |
| idStock | select dropdown | Non | liste des stock items |

---

## 7. Pages et Composants a Generer

### 7.1 Module Annonces (principale)

```
annonces/
  listing-list/              # Liste des annonces avec recherche, filtres, tri
  listing-detail/            # Detail complet d'une annonce
  listing-create/            # Formulaire de creation (dynamique selon type)
  listing-edit/              # Formulaire de modification
  comment-thread/            # Fil de commentaires threade (composant reutilisable)
  group-purchase-panel/      # Panel group buying (barre progression, join, leave)
  favorite-button/           # Bouton favori toggle (composant reutilisable)
  favorite-list/             # Page mes favoris
  listing-search/            # Recherche avancee avec filtres
```

### 7.2 Module Produits/Stock

```
products/
  product-list/
  product-create/
  product-edit/
  product-detail/

stock/
  stock-item-list/
  stock-item-create/
  stock-item-edit/
  stock-item-detail/
  stock-movement-list/
  stock-movement-create/
  stock-movement-edit/
```

---

## 8. Services Angular a Generer

```typescript
// === Services ===

@Injectable({ providedIn: 'root' })
export class ResourceListingService {
  private baseUrl = 'http://localhost:8080/api/resource-listings';

  create(req: CreateListingRequest): Observable<ListingResponse>;
  findAll(): Observable<ListingResponse[]>;
  getById(id: number): Observable<ListingResponse>;
  search(params: { type?: string; category?: string; location?: string; maxPrice?: number }): Observable<ListingResponse[]>;
  update(id: number, companyId: number, req: CreateListingRequest): Observable<ListingResponse>;
  duplicate(id: number): Observable<ListingResponse>;
  cancel(id: number, companyId: number): Observable<void>;
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  create(listingId: number, req: CreateCommentRequest): Observable<CommentResponse>;
  findByListing(listingId: number): Observable<CommentResponse[]>;
  update(commentId: number, req: CreateCommentRequest): Observable<CommentResponse>;
  delete(commentId: number): Observable<void>;
}

@Injectable({ providedIn: 'root' })
export class GroupPurchaseService {
  getById(groupId: number): Observable<GroupPurchaseResponse>;
  join(groupId: number, req: JoinGroupRequest): Observable<GroupPurchaseResponse>;
  leave(groupId: number, companyId: number): Observable<GroupPurchaseResponse>;
  getParticipants(groupId: number): Observable<ParticipantInfo[]>;
}

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  add(listingId: number): Observable<FavoriteResponse>;
  remove(listingId: number): Observable<void>;
  myFavorites(): Observable<FavoriteResponse[]>;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  findAll(category?: string): Observable<Product[]>;
  getById(id: number): Observable<Product>;
  create(req: ProductRequest): Observable<Product>;
  update(id: number, req: ProductRequest): Observable<Product>;
  delete(id: number): Observable<void>;
}

@Injectable({ providedIn: 'root' })
export class StockItemService {
  findAll(productId?: number, companyId?: number): Observable<StockItem[]>;
  getById(id: number): Observable<StockItem>;
  create(req: StockItemRequest): Observable<StockItem>;
  update(id: number, req: StockItemRequest): Observable<StockItem>;
  delete(id: number): Observable<void>;
}

@Injectable({ providedIn: 'root' })
export class StockMovementService {
  findAll(stockItemId?: number): Observable<StockMovement[]>;
  getById(id: number): Observable<StockMovement>;
  create(req: StockMovementRequest): Observable<StockMovement>;
  update(id: number, req: StockMovementRequest): Observable<StockMovement>;
  delete(id: number): Observable<void>;
}
```

---

## 9. Fonctionnalites par Page

### 9.1 Page Liste Annonces (`listing-list`)

- Charger toutes les annonces actives via `GET /api/resource-listings`
- **Filtres** : type (SURPLUS/DEMANDE/GROUP_BUYING), categorie produit, localisation, prix max
- **Tri** : par date (recent d'abord), par prix (croissant/decroissant), par popularite (favoriteCount + commentCount)
- **Pagination** : cote frontend (slice les resultats en pages de 10/20)
- **Recherche** : via `GET /api/resource-listings/search?type=SURPLUS&category=Metal&location=Tunis&maxPrice=500`
- **Affichage** : cartes (cards) avec titre, prix, quantite, type (badge couleur), localisation, nombre favoris/commentaires
- **Bouton Favori** sur chaque carte (toggle)
- **Badge** different par type : SURPLUS = vert, DEMANDE = bleu, GROUP_BUYING = orange
- **Indicateur** group buying : barre de progression du groupe si type = GROUP_BUYING
- Pour chaque annonce GROUP_BUYING, afficher le % de remplissage du groupe

### 9.2 Page Detail Annonce (`listing-detail`)

- Charger l'annonce via `GET /api/resource-listings/{id}`
- Afficher TOUTES les infos : titre, description, type, status, quantite, unite, prix, localisation, produit lie, images
- **Section Commentaires** : charger via `GET /api/resource-listings/{id}/comments`, afficher en arbre threade
- **Section Group Buying** (si type = GROUP_BUYING) :
  - Barre de progression (currentQuantity / targetQuantity)
  - Quantite restante
  - Deadline avec countdown
  - Liste des participants
  - Bouton "Rejoindre" (formulaire modal avec champ quantite)
  - Bouton "Quitter" si deja participant
- **Bouton Favori** toggle
- **Bouton Dupliquer** (si proprietaire)
- **Bouton Annuler** (si proprietaire et status ACTIVE)
- **Bouton Modifier** (si proprietaire et status ACTIVE)
- **Images/Pieces jointes** : carousel ou galerie des attachmentUrls

### 9.3 Page Creation Annonce (`listing-create`)

- Formulaire dynamique selon le type choisi
- **Etape 1** : choisir le type (SURPLUS / DEMANDE / GROUP_BUYING) via cards ou radio
- **Etape 2** : selectionner un produit existant (dropdown charge depuis `GET /api/products`)
- **Etape 3** : remplir titre, description, quantite, unite, prix, localisation
- **Etape 4** (si GROUP_BUYING) : targetQuantity + deadline
- **Etape 5** : upload images (optionnel)
- **Recapitulatif** avant soumission
- Envoyer via `POST /api/resource-listings`
- Redirection vers le detail de l'annonce creee

### 9.4 Composant Commentaires (`comment-thread`)

- Afficher les commentaires en arbre (racine + replies imbriquees)
- Formulaire de saisie en bas pour nouveau commentaire
- Bouton "Repondre" sur chaque commentaire (remplit parentId)
- Bouton "Modifier" sur ses propres commentaires
- Bouton "Supprimer" sur ses propres commentaires (ou tous si admin)
- Indicateur de chargement
- Afficher le nom complet de l'auteur + la date relative (il y a 5 min, hier, etc.)
- Indentation visuelle pour les reponses (3 niveaux max affichables)

### 9.5 Composant Group Buying (`group-purchase-panel`)

- Barre de progression : `currentQuantity / targetQuantity` (en % + chiffres)
- Couleurs : vert si > 75%, orange si 25-75%, rouge si < 25%
- Countdown deadline : jours:heures:minutes restants
- Status badge : OPEN = vert, FULL = bleu, SUCCESS = vert fonce, FAILED = rouge, CLOSED = gris
- Liste des participants avec quantite de chacun
- Formulaire Join (input quantite + bouton) dans un modal ou panel
- Bouton Leave si deja participant
- Messages d'erreur clairs : "Le vendeur ne peut pas rejoindre son propre groupe", "Quantite depasse le reste", etc.
- Desactiver le bouton Join si : groupe non OPEN, deadline passee, deja participant, est le vendeur

### 9.6 Page Favoris (`favorite-list`)

- Charger via `GET /api/favorites/me`
- Afficher la liste des annonces favorites avec titre + lien vers le detail
- Bouton Retirer de chaque favori
- Message si aucun favori

---

## 10. Contraintes Metier a Respecter dans le Frontend

### Annonces
- Le type est IMMUTABLE apres creation (ne pas afficher le champ type dans le formulaire de modification)
- Seules les annonces ACTIVE peuvent etre modifiees ou annulees
- Le companyId est toujours celui du user connecte (ne pas le rendre editable)
- La creation d'un GROUP_BUYING cree automatiquement le GroupPurchase cote backend

### Group Buying
- Le vendeur (companyId du listing) ne peut JAMAIS rejoindre son propre groupe — bloquer cote frontend aussi
- Une entreprise ne peut participer qu'UNE seule fois par groupe
- La quantite du participant ne peut pas depasser remainingQuantity
- Si le groupe est FULL/SUCCESS/FAILED/CLOSED, desactiver tous les boutons d'action
- Si la deadline est passee, afficher "Groupe expire" et desactiver

### Commentaires
- Seul un utilisateur authentifie peut commenter
- Le parentId doit etre un commentaire du meme listing (le backend verifie mais le frontend doit eviter l'erreur)
- Anti-spam : desactiver le bouton d'envoi pendant 3 secondes apres chaque publication
- L'utilisateur peut modifier uniquement SES commentaires
- L'utilisateur peut supprimer SES commentaires OU l'admin peut supprimer tout commentaire

### Favoris
- Un seul favori par utilisateur par annonce
- Toggle : si deja en favori, supprimer ; sinon, ajouter
- L'icone coeur doit refleter l'etat actuel (plein = favori, vide = non)

---

## 11. Recherche, Tri et Pagination

### Recherche
Le backend supporte les filtres via query params :
```
GET /api/resource-listings/search?type=SURPLUS&category=Metal&location=Tunis&maxPrice=500
```

Tous les params sont optionnels. Le frontend doit construire l'URL dynamiquement selon les filtres actifs.

### Tri (cote frontend)
Le backend ne supporte pas le tri natif. Implementer cote Angular :
- Par date (createdAt) : recent d'abord (defaut)
- Par prix : croissant / decroissant
- Par popularite : favoriteCount + commentCount (decroissant)
- Par titre : alphabetique

### Pagination (cote frontend)
Le backend retourne tous les resultats. Implementer la pagination cote Angular :
- Variable `pageSize` = 10 ou 20 (configurable)
- Calculer `totalPages`, `currentPage`
- Slice les resultats : `items.slice((page - 1) * pageSize, page * pageSize)`
- Composant pagination avec boutons Precedent / Suivant / numeros de pages

---

## 12. Gestion des Erreurs Frontend

### HttpInterceptor pour les erreurs
Intercepter toutes les reponses HTTP en erreur :
- **400** : Afficher `error.message` dans un toast/snackbar rouge
- **401** : Rediriger vers /login, vider le token
- **403** : Afficher "Acces refuse"
- **404** : Afficher "Ressource introuvable"
- **500** : Afficher "Erreur serveur, veuillez reessayer"

### Format des erreurs
Le backend retourne TOUJOURS un JSON `ErrorResponse`. Le message est en francais et exploitable directement pour l'affichage.

---

## 13. Fonctionnalites Avancees a Implementer

### 13.1 Duplication d'annonce
- Bouton "Dupliquer" visible sur le detail d'une annonce (si proprietaire)
- Appel `POST /api/resource-listings/{id}/duplicate`
- Redirection vers le detail de la copie creee

### 13.2 Dashboard Annonce (stats simples)
- Sur le detail, afficher : `favoriteCount`, `commentCount`
- Sur la liste, afficher les badges de popularite

### 13.3 Carte Interactive (point d'extension OpenStreetMap + Leaflet)
- Les champs `latitude` et `longitude` sont disponibles dans `ListingResponse`
- Integrer Leaflet dans un composant `listing-map`
- Afficher les annonces qui ont des coordonnees sur une carte
- Click sur un marqueur = navigation vers le detail

### 13.4 Countdown Deadline Group Buying
- Calculer le temps restant depuis `deadline` du GroupPurchaseResponse
- Afficher en format jours:heures:minutes:secondes
- Mettre a jour en temps reel (setInterval chaque seconde)
- Si deadline passee, afficher "Expire" en rouge

### 13.5 Tags et Categorie (affichage)
- Le `productCategory` est disponible dans `ListingResponse`
- Afficher comme badge/tag sur chaque annonce
- Utiliser comme filtre de recherche

### 13.6 Images/Galerie
- `attachmentUrls` contient les URLs des pieces jointes
- Afficher en carousel/galerie sur le detail
- Thumbnail sur la liste
- Si aucune image, afficher un placeholder

---

## 14. Structure Recommandee du Projet Angular

```
src/app/
  core/
    interceptors/
      auth.interceptor.ts         # Ajoute le JWT header
      error.interceptor.ts        # Gere les erreurs globalement
    guards/
      auth.guard.ts               # Protege les routes
    services/
      auth.service.ts
    models/
      interfaces.ts               # TOUTES les interfaces TypeScript (section 4)

  features/
    auth/
      login/
      register/

    annonces/
      listing-list/
      listing-detail/
      listing-create/
      listing-edit/
      listing-search/
      components/
        comment-thread/
        group-purchase-panel/
        favorite-button/
        listing-card/
      services/
        resource-listing.service.ts
        comment.service.ts
        group-purchase.service.ts
        favorite.service.ts

    products/
      product-list/
      product-create/
      product-edit/
      product-detail/
      services/
        product.service.ts

    stock/
      stock-item-list/
      stock-item-create/
      stock-item-edit/
      stock-item-detail/
      stock-movement-list/
      stock-movement-create/
      stock-movement-edit/
      services/
        stock-item.service.ts
        stock-movement.service.ts

    favorites/
      favorite-list/

  shared/
    components/
      pagination/
      search-bar/
      confirm-dialog/
      toast-notification/
      loading-spinner/
```

---

## 15. Style et UX Recommandes

- Framework CSS : Angular Material, PrimeNG, ou TailwindCSS
- Design moderne, responsive, mobile-first
- Couleurs par type d'annonce : SURPLUS = vert, DEMANDE = bleu, GROUP_BUYING = orange
- Toast/Snackbar pour les messages de succes et erreur
- Spinner de chargement sur chaque requete HTTP
- Confirmation avant suppression (dialog modal)
- Formulaires avec indicateurs visuels (champ rouge si invalide, vert si valide)
- Barre de progression animee pour le group buying
- Countdown anime pour la deadline

---

## 16. Variables d'Environnement Angular

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.eco-ressource.tn',
};
```

Tous les services doivent utiliser `environment.apiUrl` comme base URL.

---

## 17. Resume des APIs Externes (Points d'Extension)

Ces APIs ne sont PAS encore implementees dans le backend mais les champs sont prets.

| API | Usage | Champs concernes |
|---|---|---|
| OpenRouteService | Geocoder une adresse en lat/lng | `location` -> `latitude`, `longitude` |
| Leaflet + OpenStreetMap | Afficher les annonces sur une carte | `latitude`, `longitude` |
| Perspective API | Moderation des commentaires avant publication | `content` du commentaire |
| Python IA (futur) | Detection materiau, tags, auto-description, suggestion prix | Appel separe depuis le backend |

### Integration OpenRouteService (recommandee)
```typescript
// Quand l'utilisateur saisit une localisation, geocoder pour obtenir lat/lng
const url = `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${location}`;
// Stocker lat/lng dans le formulaire avant soumission
```

### Integration Leaflet (recommandee)
```bash
npm install leaflet @types/leaflet
```
Creer un composant `listing-map` qui affiche les markers sur une carte OpenStreetMap.

---

## 18. Checklist Finale pour l'IA

Avant de considerer le module comme termine, verifier :

- [ ] Login/Register fonctionnels avec JWT
- [ ] Interceptor JWT sur toutes les requetes
- [ ] Interceptor erreur avec affichage toast
- [ ] CRUD complet Products (list, create, edit, delete)
- [ ] CRUD complet Stock Items (list, create, edit, delete, filtres)
- [ ] CRUD complet Stock Movements (list, create, edit, delete, filtres)
- [ ] Creation annonce avec formulaire dynamique selon type
- [ ] Liste annonces avec filtres (type, categorie, localisation, prix)
- [ ] Tri des annonces (date, prix, popularite)
- [ ] Pagination des annonces
- [ ] Detail annonce avec toutes les sections
- [ ] Modification annonce (proprietaire uniquement)
- [ ] Duplication annonce
- [ ] Annulation annonce
- [ ] Commentaires threades (creer, repondre, modifier, supprimer)
- [ ] Anti-spam commentaires
- [ ] Group buying : affichage barre progression
- [ ] Group buying : rejoindre avec validation
- [ ] Group buying : quitter
- [ ] Group buying : countdown deadline
- [ ] Group buying : liste participants
- [ ] Favoris : toggle add/remove
- [ ] Favoris : page mes favoris
- [ ] Recherche avancee multi-criteres
- [ ] Gestion erreurs propre (toast avec message backend)
- [ ] Formulaires avec validations visuelles
- [ ] Responsive design
- [ ] Loading spinners
- [ ] Confirmations avant suppression
