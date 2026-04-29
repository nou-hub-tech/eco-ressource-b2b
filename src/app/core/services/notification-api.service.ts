import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface NotificationData {
  id?: string;
  type: string;
  deliveryOrderId: number;
  clientName: string;
  targetUserId: number;
  message: string;
  problemeType?: string;
  retardMinutes?: number;
  transporterName?: string;
  timestamp: string;
  read?: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUnreadNotifications(userId: number): Observable<NotificationData[]> {
    return this.http.get<NotificationData[]>(`${this.apiUrl}/notifications/unread/${userId}`);
  }

  // ✅ AJOUTER CETTE MÉTHODE
  getAllNotifications(userId: number): Observable<NotificationData[]> {
    return this.http.get<NotificationData[]>(`${this.apiUrl}/notifications/all/${userId}`);
  }

  sendNotification(userId: number, notification: NotificationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/send`, { userId, ...notification });
  }

  markAsRead(userId: number, notificationIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/mark-read/${userId}`, notificationIds);
  }
}