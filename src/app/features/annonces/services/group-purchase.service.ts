import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GroupPurchaseResponse, JoinGroupRequest, ParticipantInfo } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class GroupPurchaseService {
  private readonly baseUrl = `${environment.apiUrl}/groups`;

  constructor(private readonly http: HttpClient) {}

  getById(groupId: number): Observable<GroupPurchaseResponse> {
    return this.http.get<GroupPurchaseResponse>(`${this.baseUrl}/${groupId}`);
  }

  join(groupId: number, req: JoinGroupRequest): Observable<GroupPurchaseResponse> {
    return this.http.post<GroupPurchaseResponse>(`${this.baseUrl}/${groupId}/join`, req);
  }

  leave(groupId: number, companyId: number): Observable<GroupPurchaseResponse> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.delete<GroupPurchaseResponse>(`${this.baseUrl}/${groupId}/leave`, { params });
  }

  getParticipants(groupId: number): Observable<ParticipantInfo[]> {
    return this.http.get<ParticipantInfo[]>(`${this.baseUrl}/${groupId}/participants`);
  }
}
