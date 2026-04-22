import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private api = 'http://localhost:8080/files';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.api}/upload`, formData).pipe(
      map((res: { url: string }) => {
        // Backend returns { url: "http://localhost:8080/files/123_abc.jpg" }
        // Extract just the filename from the URL for storage in DB
        const filename = res.url.split('/files/')[1] ?? res.url;
        return { url: res.url, filename };
      })
    );
  }

  getImageUrl(filename: string): string {
    return `http://localhost:8080/files/${filename}`;
  }
}