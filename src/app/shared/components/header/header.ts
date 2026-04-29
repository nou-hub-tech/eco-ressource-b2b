import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RealtimeEvent } from '../../../core/models/annonces.interfaces';
import { AuthService, User } from '../../../core/services/auth';
import { ThemeService } from '../../../core/services/theme';
import { RealtimeService } from '../../../features/annonces/services/realtime.service';

interface HeaderNotification {
  text: string;
  time: string;
  icon: string;
  route?: unknown[];
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  @Input() pageTitle = 'Dashboard';
  @Output() toggleSidebar = new EventEmitter<void>();

  user: User | null = null;
  showNotif = false;
  isDark = false;
  notifications: HeaderNotification[] = [];

  private authSub?: Subscription;
  private themeSub?: Subscription;
  private userNotifSub?: Subscription;
  private adminNotifSub?: Subscription;
  private listingNotifSub?: Subscription;
  private readonly recentNotificationKeys = new Set<string>();

  constructor(
    private readonly authService: AuthService,
    public readonly themeService: ThemeService,
    private readonly realtimeService: RealtimeService,
    private readonly router: Router,
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.user$.subscribe((u: User | null) => {
      this.user = u;
      this.bindRealtimeNotifications(u);
    });
    this.themeSub = this.themeService.isDark$.subscribe((d) => (this.isDark = d));
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.themeSub?.unsubscribe();
    this.userNotifSub?.unsubscribe();
    this.adminNotifSub?.unsubscribe();
    this.listingNotifSub?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  openNotification(notification: HeaderNotification): void {
    this.showNotif = false;
    if (notification.route) {
      void this.router.navigate(notification.route);
    }
  }

  private bindRealtimeNotifications(user: User | null): void {
    this.userNotifSub?.unsubscribe();
    this.adminNotifSub?.unsubscribe();
    this.listingNotifSub?.unsubscribe();
    if (!user) return;

    this.listingNotifSub = this.realtimeService
      .listingEvents()
      .subscribe((event) => this.addNotification(event, user.role === 'admin'));

    const userId = Number(user.id);
    if (Number.isFinite(userId)) {
      this.userNotifSub = this.realtimeService
        .userNotifications(userId)
        .subscribe((event) => this.addNotification(event, user.role === 'admin'));
    }

    if (user.role === 'admin') {
      this.adminNotifSub = this.realtimeService
        .adminNotifications()
        .subscribe((event) => this.addNotification(event, true));
    }
  }

  private addNotification(event: RealtimeEvent, admin = false): void {
    if (!event?.type) return;
    const key = this.notificationKey(event);
    if (this.recentNotificationKeys.has(key)) return;
    this.recentNotificationKeys.add(key);
    setTimeout(() => this.recentNotificationKeys.delete(key), 15000);

    const payload = event.payload as { id?: number; listingId?: number } | null | undefined;
    const listingId = event.listingId ?? payload?.listingId;
    const route = this.routeForEvent(event, admin, listingId);

    const notification: HeaderNotification = {
      text: event.message || this.messageForEvent(event.type),
      time: 'Maintenant',
      icon: this.iconForEvent(event.type),
      route
    };
    queueMicrotask(() => {
      this.ngZone.run(() => {
        this.notifications = [notification, ...this.notifications].slice(0, 20);
        this.cdr.detectChanges();
      });
    });
  }

  private routeForEvent(
    event: RealtimeEvent,
    admin: boolean,
    listingId?: number
  ): unknown[] | undefined {
    if (admin) {
      if (listingId) return ['/admin/annonces', listingId];
      return ['/admin/listings'];
    }
    if (listingId) return ['/enterprise/annonces', listingId];
    if (event.type === 'LISTING_CREATED') return ['/enterprise/annonces'];
    return undefined;
  }

  private notificationKey(event: RealtimeEvent): string {
    const payload = event.payload as { id?: number; listingId?: number } | null | undefined;
    const listingId = event.listingId ?? payload?.listingId ?? 'global';
    const entityId = payload?.id ?? event.groupId ?? event.userId ?? 'event';
    const family = this.notificationFamily(event.type);
    return `${family}:${listingId}:${entityId}`;
  }

  private notificationFamily(type: string): string {
    switch (type) {
      case 'NEW_COMMENT':
      case 'COMMENT_CREATED':
        return 'comment-created';
      case 'COMMENT_UPDATED':
        return 'comment-updated';
      case 'COMMENT_DELETED':
        return 'comment-deleted';
      case 'FAVORITE_ADDED':
      case 'FAVORITE_CHANGED':
        return 'favorite';
      case 'GROUP_JOINED':
      case 'GROUP_LEFT':
      case 'GROUP_CHANGED':
        return 'group';
      case 'COMMENT_MODERATED':
      case 'COMMENT_MODERATED_ADMIN':
        return 'moderation';
      default:
        return type;
    }
  }

  private iconForEvent(type: string): string {
    if (type.includes('MODERATED')) return '!';
    if (type.includes('COMMENT') || type === 'NEW_COMMENT') return 'C';
    if (type.includes('FAVORITE')) return 'F';
    if (type.includes('GROUP')) return 'G';
    if (type.includes('LISTING')) return 'A';
    return 'i';
  }

  private messageForEvent(type: string): string {
    switch (type) {
      case 'LISTING_CREATED':
        return 'Nouvelle annonce publiee';
      case 'LISTING_UPDATED':
        return 'Une annonce a ete mise a jour';
      case 'LISTING_DELETED':
        return 'Une annonce a ete supprimee';
      case 'LISTING_CANCELLED':
        return 'Une annonce a ete annulee';
      case 'COMMENT_MODERATED':
      case 'COMMENT_MODERATED_ADMIN':
        return 'Alerte moderation commentaire';
      case 'NEW_COMMENT':
        return 'Nouveau commentaire sur votre annonce';
      case 'COMMENT_CREATED':
        return 'Nouveau commentaire sur une annonce';
      case 'COMMENT_UPDATED':
        return 'Commentaire mis a jour';
      case 'COMMENT_DELETED':
        return 'Commentaire supprime';
      case 'FAVORITE_ADDED':
        return 'Nouveau favori sur votre annonce';
      case 'FAVORITE_REMOVED':
      case 'FAVORITE_CHANGED':
        return 'Favori mis a jour';
      case 'GROUP_JOINED':
        return 'Une entreprise a rejoint votre achat groupe';
      case 'GROUP_LEFT':
        return 'Une entreprise a quitte votre achat groupe';
      case 'GROUP_CHANGED':
        return 'Achat groupe mis a jour';
      default:
        return 'Nouvelle notification';
    }
  }
}
