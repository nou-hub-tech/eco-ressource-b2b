# Référentiel — Gestion des annonces (entreprise)

Ce document liste les **points d’entrée** du module **annonces** dans l’application Angular : menu, URLs, rôle de chaque écran et rappel des APIs backend utilisées.

**Préfixe d’URL** : toutes les routes ci‑dessous sont chargées sous le rôle **enterprise** (layout + garde d’authentification), avec le chemin de base :

` /enterprise/annonces/... `

Le module est chargé en **lazy loading** depuis `EnterpriseModule` (`path: 'annonces'` → `AnnoncesModule`).

---

## 1. Entrée dans le menu (sidebar)

| Libellé     | Route de destination        | Remarque |
|------------|-------------------------------|----------|
| **Annonces** | `/enterprise/annonces` | Visible pour le rôle **enterprise** ; pointe vers la liste des annonces. |

Fichier : `src/app/shared/components/sidebar/sidebar.ts` (`enterpriseNav`).

---

## 2. Routes Angular du module annonces

Les routes sont définies dans `src/app/features/annonces/annonces-module.ts`.  
Voici les **URLs complètes** (à utiliser dans le navigateur ou les `routerLink`).

### 2.1 Annonces (listings)

| URL complète | Écran / composant | Explication |
|--------------|-------------------|-------------|
| `/enterprise/annonces` | **ListingList** | Liste des annonces (filtres par type, catégorie, lieu…). Actions : recherche avancée, nouvelle annonce. |
| `/enterprise/annonces/create` | **ListingCreate** | Formulaire de **création** d’une annonce (surplus, demande, achat groupé selon le flux métier). |
| `/enterprise/annonces/search` | **ListingSearch** | **Recherche avancée** d’annonces. |
| `/enterprise/annonces/favorites` | **FavoriteList** | Liste des annonces **mises en favoris** par l’utilisateur. |
| `/enterprise/annonces/:id` | **ListingDetail** | **Détail** d’une annonce (`:id` = identifiant numérique). Favoris, commentaires, panneau achat groupé, actions (ex. modifier si autorisé). |
| `/enterprise/annonces/:id/edit` | **ListingEdit** | **Modification** d’une annonce existante. |

### 2.2 Produits (catalogue lié aux annonces — API `/api/products`)

Ces écrans gèrent les **produits du module annonces** (modèle `annonces.interfaces`), distincts du module « gestion produit » global (`ProductService` → `environment.productApiUrl`).

| URL complète | Écran / composant | Explication |
|--------------|-------------------|-------------|
| `/enterprise/annonces/products` | **ProductList** | Liste des **produits** associés au flux annonces ; liens vers création, détail, édition. |
| `/enterprise/annonces/products/create` | **ProductCreate** | Création d’un produit pour le catalogue annonces. |
| `/enterprise/annonces/products/:id` | **ProductDetail** | Détail d’un produit (`:id` = `idProduct`). |
| `/enterprise/annonces/products/:id/edit` | **ProductEdit** | Édition d’un produit. |

Service HTTP principal : `ProductAnnoncesService` → base `${environment.apiUrl}/products`.

### 2.3 Stock & mouvements (API dédiées annonces)

| URL complète | Écran / composant | Explication |
|--------------|-------------------|-------------|
| `/enterprise/annonces/stock` | **StockItemList** | Liste des **articles en stock** liés au module annonces. |
| `/enterprise/annonces/stock/create` | **StockItemCreate** | Création d’un article de stock. |
| `/enterprise/annonces/stock/:id` | **StockItemDetail** | Détail d’un article (`:id` = identifiant stock). |
| `/enterprise/annonces/stock/:id/edit` | **StockItemEdit** | Modification d’un article de stock. |
| `/enterprise/annonces/stock/movements` | **StockMovementList** | Liste des **mouvements** de stock. |
| `/enterprise/annonces/stock/movements/create` | **StockMovementCreate** | Saisie d’un nouveau mouvement. |
| `/enterprise/annonces/stock/movements/:id/edit` | **StockMovementEdit** | Édition d’un mouvement (`:id` = identifiant du mouvement). |

Services : `StockItemService`, `StockMovementService` (voir dossier `features/annonces/services/`).

---

## 3. Fonctionnalités transverses sur les écrans annonces

| Fonctionnalité | Où ça apparaît | Rôle |
|----------------|----------------|------|
| **Carte d’annonce** | `ListingCard` | Résumé d’une annonce dans les listes. |
| **Pagination** | `Pagination` | Navigation par pages dans les listes. |
| **Favoris** | `FavoriteButton`, `FavoriteService` | Ajout / retrait favori ; API sous `environment.apiUrl` + chemins `resource-listings/.../favorite`. |
| **Commentaires** | `CommentThread`, `CommentService` | Fil de discussion sur une annonce. |
| **Achat groupé** | `GroupPurchasePanel`, `GroupPurchaseService` | Panneau et logique d’achat groupé sur le détail d’annonce. |
| **Confirmation** | `ConfirmDialog` | Dialogue de confirmation (suppression, actions sensibles). |

---

## 4. API backend (rappel)

Les appels passent en général par **`environment.apiUrl`** (ex. `http://localhost:8080/api` en développement). Exemples utilisés par le module annonces :

| Ressource | Exemple de chemin (relatif à `apiUrl`) |
|-----------|----------------------------------------|
| Annonces (resource listings) | `/resource-listings`, `/resource-listings/search`, `/resource-listings/:id`, favoris… |
| Produits **annonces** | `/products` |
| Stock / mouvements | selon `stock-item.service.ts` et `stock-movement.service.ts` |

**À ne pas confondre** : le **`ProductService`** racine (`src/app/core/services/product.ts`) pointe vers **`environment.productApiUrl`** (ex. `/product` sur le serveur Spring) pour le **catalogue produit « gestion produit »** (écrans `/products`, `/admin/products`, etc.). Ce n’est pas le même périmètre que **`ProductAnnoncesService`** (`/api/products`).

---

## 5. Fichiers utiles pour la maintenance

| Fichier | Contenu |
|---------|---------|
| `src/app/features/annonces/annonces-module.ts` | Déclarations + **routes** du module. |
| `src/app/features/enterprise/enterprise-module.ts` | Lazy load `annonces` sous `enterprise`. |
| `src/app/core/models/annonces.interfaces.ts` | Types TypeScript du domaine annonces. |
| `docs/gestion-annonces-referentiel.md` | Ce document. |

---

## 6. Vérification avec `FRONTEND-ANGULAR-SPEC-MODULE-ANNONCES.md` et `guide code/`

### Ce que prescrit le cahier des charges (section 7)

Le spec liste **uniquement** l’arborescence du module sous `annonces/` (`listing-list`, `listing-detail`, `listing-create`, etc.) et les dossiers `products/` et `stock/` **à l’intérieur de ce module** — équivalent dans le repo à `src/app/features/annonces/`, routé sous **`/enterprise/annonces`** (lazy load). Les APIs sont celles des sections **5.x** (`/api/resource-listings`, `/api/products`, … avec préfixe `/api`).

**Aucune mention** dans le spec des routes Angular **`/enterprise/marketplace`** ou **`/enterprise/my-listings`**.

### Page « Marketplace » vs concept « marketplace »

- Dans **`guide code/module-gestion-annonces-final.md`**, le mot *marketplace* désigne le **concept métier** (« explorer la marketplace », annonces visibles après publication). Fonctionnellement, c’est aligné avec **la liste d’annonces branchée backend** décrite en **§9.1** du spec (`GET /api/resource-listings`), implémentée par **`ListingList`** sous **`/enterprise/annonces`**.

- La route Angular **`/enterprise/marketplace`** pointe vers le composant **`Marketplace`** (`enterprise-module`), qui **n’est pas** dans l’arborescence §7 du module annonces et **n’utilise pas** les endpoints du spec dans l’état actuel du code (données statiques de démo).

### Page « My Listings »

- Le spec prévoit liste / détail / favoris / recherche d’annonces via **`resource-listings`** ; il ne nomme pas une route **`my-listings`**.

- **`/enterprise/my-listings`** → composant **`MyListings`** : **hors** `AnnoncesModule`, pas listé en §7 ; implémentation actuelle avec **données statiques**, pas équivalente à une vue « mes annonces » filtrée sur l’API.

### Synthèse

| Question | Réponse |
|----------|---------|
| **`/enterprise/marketplace`** est-il le module gestion annonces du spec ? | **Non** comme **implémentation** ; **oui** seulement au sens métier large si on identifie « marketplace » à la **liste d’annonces API** → alors c’est **`/enterprise/annonces`**. |
| **`/enterprise/my-listings`** est-il ce module ? | **Non** — autre composant enterprise, pas décrit dans §7 ; pas branché comme le module annonces. |

Pour être **conforme au cahier des charges** pour la découverte et la gestion des annonces (API §5.1), l’entrée à utiliser est **`/enterprise/annonces`** (et sous-routes du `AnnoncesModule`).

---

*Généré à partir de la structure actuelle du dépôt ; adapter les URLs si `environment` change (prod).*
