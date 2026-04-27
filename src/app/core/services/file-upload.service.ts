import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private api = '/files';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.api}/upload`, formData).pipe(
      map((res: { url: string }) => {
        // Backend returns { url: "/files/123_abc.jpg" } or full URL
        // Extract just the filename from the URL for storage in DB
        const filename = res.url.split('/files/')[1] ?? res.url;
        return { url: res.url, filename };
      })
    );
  }

  getImageUrl(filename: string): string {
    return `/files/${filename}`;
  }
}