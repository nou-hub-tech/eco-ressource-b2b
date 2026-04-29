import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

/**
 * POST multipart {@code /api/listing-images} — champ {@code file}.
 * La réponse Spring peut exposer l’URL sous plusieurs formes ; on normalise en une chaîne utilisable dans {@code attachmentUrls}.
 */
export function parseListingImageUrlFromResponse(body: unknown): string | null {
  if (typeof body === 'string') {
    const t = body.trim();
    return t || null;
  }
  if (!body || typeof body !== 'object') return null;
  const o = body as Record<string, unknown>;
  for (const key of ['url', 'path', 'fileUrl', 'filePath', 'location', 'href'] as const) {
    const v = o[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  const att = o['attachmentUrls'];
  if (Array.isArray(att) && typeof att[0] === 'string' && att[0].trim()) {
    return att[0].trim();
  }
  const nested = o['data'];
  if (nested && typeof nested === 'object') {
    return parseListingImageUrlFromResponse(nested);
  }
  return null;
}

@Injectable({ providedIn: 'root' })
export class ListingImageUploadService {
  private readonly endpoint = `${environment.apiUrl}/listing-images`;

  constructor(private readonly http: HttpClient) {}

  /** Envoie le fichier et retourne l’URL relative ou absolue à stocker dans {@code attachmentUrls}. */
  upload(file: File): Observable<string> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<unknown>(this.endpoint, fd).pipe(
      map((body) => {
        const url = parseListingImageUrlFromResponse(body);
        if (!url) {
          throw new Error(
            "Réponse du serveur d'upload d'image non reconnue (attendu une URL ou un chemin /files/...)."
          );
        }
        return url;
      })
    );
  }
}
