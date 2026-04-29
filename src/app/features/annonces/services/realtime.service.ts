import { Injectable, NgZone } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { Observable, Subject, filter, share } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RealtimeEvent } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private client: Client | null = null;
  private connected = false;
  private readonly eventSubject = new Subject<RealtimeEvent>();
  readonly events$ = this.eventSubject.asObservable().pipe(share());

  constructor(private readonly zone: NgZone) {}

  connect(): void {
    if (this.client) return;

    this.client = new Client({
      brokerURL: this.buildWsUrl(),
      reconnectDelay: 3000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: () => {}
    });

    this.client.onConnect = () => {
      this.connected = true;
    };
    this.client.onDisconnect = () => {
      this.connected = false;
    };
    this.client.onStompError = () => {
      this.connected = false;
    };
    this.client.onWebSocketClose = () => {
      this.connected = false;
    };

    this.client.activate();
  }

  topic<T = unknown>(destination: string): Observable<RealtimeEvent<T>> {
    this.connect();
    return new Observable<RealtimeEvent<T>>((observer) => {
      let sub: StompSubscription | null = null;
      const attach = (): void => {
        if (!this.client?.connected) {
          setTimeout(attach, 250);
          return;
        }
        sub = this.client.subscribe(destination, (msg: IMessage) => {
          const event = this.parse<T>(msg.body);
          if (!event) return;
          this.zone.run(() => {
            this.eventSubject.next(event);
            observer.next(event);
          });
        });
      };
      attach();
      return () => sub?.unsubscribe();
    });
  }

  listingEvents(): Observable<RealtimeEvent> {
    return this.topic('/topic/listings');
  }

  listingDetailEvents(listingId: number): Observable<RealtimeEvent> {
    return this.topic(`/topic/listings/${listingId}`);
  }

  commentEvents<T = unknown>(listingId: number): Observable<RealtimeEvent<T>> {
    return this.topic<T>(`/topic/listings/${listingId}/comments`);
  }

  favoriteEvents<T = unknown>(listingId: number): Observable<RealtimeEvent<T>> {
    return this.topic<T>(`/topic/listings/${listingId}/favorites`);
  }

  groupEvents<T = unknown>(groupId: number): Observable<RealtimeEvent<T>> {
    return this.topic<T>(`/topic/groups/${groupId}`);
  }

  userNotifications(userId: number): Observable<RealtimeEvent> {
    return this.topic(`/topic/users/${userId}/notifications`).pipe(
      filter((event) => !!event.message)
    );
  }

  adminNotifications(): Observable<RealtimeEvent> {
    return this.topic('/topic/admin/notifications').pipe(
      filter((event) => !!event.message)
    );
  }

  private parse<T>(body: string): RealtimeEvent<T> | null {
    try {
      return JSON.parse(body) as RealtimeEvent<T>;
    } catch {
      return null;
    }
  }

  private buildWsUrl(): string {
    const apiUrl = environment.apiUrl || '/api';
    if (/^https?:\/\//i.test(apiUrl)) {
      return `${apiUrl.replace(/\/api\/?$/, '').replace(/^http/i, 'ws')}/ws`;
    }

    if (typeof window === 'undefined') {
      return '/ws';
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}/ws`;
  }
}
