import { HttpErrorResponse } from '@angular/common/http';
import {
  ListingResponse,
  Product,
  ResourceListingStatus,
  ListingType,
  GroupPurchaseResponse
} from '../../../core/models/annonces.interfaces';
/** Déballer une liste ou une page Spring `{ content: [...] }`. */
export function unwrapApiArray(body: unknown): Record<string, unknown>[] {
  if (Array.isArray(body)) return body as Record<string, unknown>[];
  if (body && typeof body === 'object' && body !== null && 'content' in body) {
    const c = (body as { content: unknown }).content;
    if (Array.isArray(c)) return c as Record<string, unknown>[];
  }
  return [];
}

/** Backend Spring envoie souvent `id` ou `id_product` au lieu de `idProduct`. */
export function normalizeProduct(raw: Record<string, unknown>): Product {
  const idRaw = raw['idProduct'] ?? raw['id'] ?? raw['id_product'];
  const idProduct = typeof idRaw === 'number' ? idRaw : Number(idRaw);
  return {
    idProduct: Number.isFinite(idProduct) ? idProduct : 0,
    name: String(raw['name'] ?? ''),
    category: (raw['category'] as string) ?? null,
    description: (raw['description'] as string) ?? null,
    image: (raw['image'] as string) ?? null,
    materialType: (raw['materialType'] as string) ?? null,
    recyclable: Boolean(raw['recyclable']),
    companyId:
      raw['companyId'] !== undefined && raw['companyId'] !== null
        ? Number(raw['companyId'])
        : null
  };
}

export function normalizeListing(raw: Record<string, unknown>): ListingResponse {
  const gp = (raw['groupPurchase'] ?? raw['group_purchase']) as
    | GroupPurchaseResponse
    | null
    | undefined;
  return {
    id: Number(raw['id']),
    title: String(raw['title'] ?? ''),
    description: String(raw['description'] ?? ''),
    type: raw['type'] as ListingType,
    status: raw['status'] as ResourceListingStatus,
    quantity: Number(raw['quantity'] ?? 0),
    unit: String(raw['unit'] ?? ''),
    price: raw['price'] !== undefined && raw['price'] !== null ? Number(raw['price']) : null,
    location: (raw['location'] as string) ?? null,
    latitude: raw['latitude'] !== undefined && raw['latitude'] !== null ? Number(raw['latitude']) : null,
    longitude: raw['longitude'] !== undefined && raw['longitude'] !== null ? Number(raw['longitude']) : null,
    productId: Number(raw['productId'] ?? raw['product_id']),
    productName: String(raw['productName'] ?? raw['product_name'] ?? ''),
    productCategory: String(raw['productCategory'] ?? raw['product_category'] ?? ''),
    companyId: Number(raw['companyId'] ?? raw['company_id']),
    companyName: (raw['companyName'] ?? raw['company_name'] ?? null) as string | null,
    ownerFullName: (raw['ownerFullName'] ?? raw['owner_full_name'] ?? null) as string | null,
    createdAt: String(raw['createdAt'] ?? raw['created_at'] ?? ''),
    attachmentUrls: Array.isArray(raw['attachmentUrls'])
      ? (raw['attachmentUrls'] as string[])
      : Array.isArray(raw['attachment_urls'])
        ? (raw['attachment_urls'] as string[])
        : [],
    groupPurchase: gp ?? null,
    favoriteCount: Number(raw['favoriteCount'] ?? raw['favorite_count'] ?? 0),
    commentCount: Number(raw['commentCount'] ?? raw['comment_count'] ?? 0)
  };
}

export function httpErrorMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      return 'Connexion impossible au backend (vérifiez que Spring Boot est démarré sur le port 9090 et que CORS autorise http://localhost:4200).';
    }
    if (err.status === 401) {
      return 'Non authentifié ou session expirée — reconnectez-vous (compte entreprise).';
    }
    if (err.status === 403) {
      return "Accès refusé (403) : le rôle de l’utilisateur n’est pas autorisé sur cette ressource côté API. Vérifiez Spring Security (rôles « entreprise » / annonces) pour l’URL appelée.";
    }
    const msg = err.error?.message ?? err.error?.error;
    if (typeof msg === 'string') return msg;
    if (typeof err.error === 'string') return err.error;
    return err.message || `Erreur HTTP ${err.status}`;
  }
  return 'Erreur réseau ou serveur.';
}
