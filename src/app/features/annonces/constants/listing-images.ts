/** Photo utilisée lorsqu’aucune image locale n’est choisie pour l’annonce. */
export const DEFAULT_LISTING_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTndc60D3vyCFZIbNLbynSmxtgRWYRlqOBMCQ&s';

export const MAX_LISTING_IMAGE_BYTES = 5 * 1024 * 1024;

/** Nombre maximum de photos par annonce (aligner la validation côté Spring sur cette valeur). */
export const MAX_LISTING_PHOTOS = 5;

/** Garantit au moins une URL envoyée au backend (placeholder si vide). Coupe à {@link MAX_LISTING_PHOTOS}. */
export function resolveListingAttachmentUrls(urls: string[] | null | undefined): string[] {
  const trimmed = (urls ?? []).map((u) => u.trim()).filter(Boolean).slice(0, MAX_LISTING_PHOTOS);
  if (trimmed.length === 0) {
    return [DEFAULT_LISTING_IMAGE_URL];
  }
  return trimmed;
}

/** True si aucune photo « réelle » (vide ou uniquement le placeholder par défaut). */
export function isOnlyDefaultPlaceholder(urls: string[] | null | undefined): boolean {
  const t = (urls ?? []).map((u) => u.trim()).filter(Boolean);
  if (t.length === 0) return true;
  return t.every((u) => u === DEFAULT_LISTING_IMAGE_URL);
}
