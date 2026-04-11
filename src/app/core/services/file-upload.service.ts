import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private api = 'http://localhost:8080/files';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<{ filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ filename: string }>(`${this.api}/upload`, formData);
  }

  getImageUrl(filename: string): string {
    return `http://localhost:8080/files/${filename}`;
  }
}