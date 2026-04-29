import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { CommentResponse } from '../../../../core/models/annonces.interfaces';
import { AuthService } from '../../../../core/services/auth.service';
import { RealtimeService } from '../../services/realtime.service';
import { EmailJsBrowserService } from '../../services/email-js-browser.service';

@Component({
  selector: 'app-comment-thread',
  standalone: false,
  templateUrl: './comment-thread.html',
  styleUrls: ['./comment-thread.css']
})
export class CommentThread implements OnInit, OnDestroy, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  @Input() listingId!: number;
  /** companyId du listing : permet au vendeur de supprimer les commentaires sur son annonce. */
  @Input() listingCompanyId: number | null = null;
  @Output() commentCountUpdated = new EventEmitter<number>();

  comments: CommentResponse[] = [];
  commentCtrl = new FormControl('', [Validators.required, Validators.maxLength(2000)]);
  loading = false;
  sending = false;
  antiSpam = false;
  replyTo: CommentResponse | null = null;
  editingComment: CommentResponse | null = null;
  editContentError = '';
  currentUserId: number | null = null;
  currentUserRole: string | null = null;
  currentCompanyId: number | null = null;
  currentUserEmail: string | null = null;
  private spamTimer: any;
  private realtimeSub?: Subscription;
  private realtimeListingId: number | null = null;

  constructor(
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly realtimeService: RealtimeService,
    private readonly emailJsBrowserService: EmailJsBrowserService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  private refreshView(): void {
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  get totalCommentCount(): number {
    return this.countTotal(this.comments);
  }

  private countTotal(nodes: CommentResponse[] | null | undefined): number {
    if (!nodes?.length) return 0;
    let t = 0;
    for (const c of nodes) {
      t += 1;
      if (c.replies?.length) {
        t += this.countTotal(c.replies);
      }
    }
    return t;
  }

  private emitCommentCount(): void {
    const n = this.countTotal(this.comments);
    const push = (): void =>
      this.ngZone.run(() => this.commentCountUpdated.emit(n));
    push();
    queueMicrotask(() => push());
  }

  private syncLocalComments(comments: CommentResponse[]): void {
    this.comments = comments;
    this.emitCommentCount();
    this.refreshView();
  }

  private addCommentToTree(
    nodes: CommentResponse[],
    comment: CommentResponse
  ): CommentResponse[] {
    if (!comment.parentId) {
      return [...nodes, { ...comment, replies: comment.replies ?? [] }];
    }

    return nodes.map((node) => {
      if (node.id === comment.parentId) {
        return {
          ...node,
          replies: [...(node.replies ?? []), { ...comment, replies: comment.replies ?? [] }]
        };
      }

      if (node.replies?.length) {
        return {
          ...node,
          replies: this.addCommentToTree(node.replies, comment)
        };
      }

      return node;
    });
  }

  private updateCommentInTree(
    nodes: CommentResponse[],
    comment: CommentResponse
  ): CommentResponse[] {
    return nodes.map((node) => {
      if (node.id === comment.id) {
        return {
          ...node,
          ...comment,
          replies: node.replies ?? comment.replies ?? []
        };
      }

      if (node.replies?.length) {
        return {
          ...node,
          replies: this.updateCommentInTree(node.replies, comment)
        };
      }

      return node;
    });
  }

  private removeCommentFromTree(nodes: CommentResponse[], id: number): CommentResponse[] {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        replies: node.replies?.length ? this.removeCommentFromTree(node.replies, id) : []
      }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listingId'] && !changes['listingId'].firstChange) {
      const id = this.listingId;
      if (Number.isFinite(id) && id > 0) {
        this.comments = [];
        this.realtimeListingId = null;
        this.realtimeSub?.unsubscribe();
        this.loadComments();
        this.subscribeRealtimeComments();
      }
    }
  }

  ngOnInit(): void {
    this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.currentUserId = user ? parseInt(user.id, 10) : null;
      this.currentUserRole = user?.role ?? null;
      this.currentCompanyId = this.authService.getCompanyProfileId();
      this.currentUserEmail = user?.email ?? null;
      this.refreshView();
    });
    if (this.authService.isLoggedIn() && this.authService.getCompanyProfileId() == null) {
      this.authService.refreshProfileFromApi().subscribe({
        next: () => {},
        error: () => {}
      });
    }
    this.loadComments();
    this.subscribeRealtimeComments();
  }

  ngOnDestroy(): void {
    if (this.spamTimer) clearTimeout(this.spamTimer);
    this.realtimeSub?.unsubscribe();
  }

  loadComments(): void {
    this.loading = true;
    this.commentService.findByListing(this.listingId).subscribe({
      next: (data) => {
        this.comments = Array.isArray(data) ? data : [];
        this.loading = false;
        this.emitCommentCount();
        this.refreshView();
      },
      error: () => {
        this.loading = false;
        this.refreshView();
      }
    });
  }

  submit(): void {
    if (this.commentCtrl.invalid || this.antiSpam || !this.commentCtrl.value?.trim()) return;

    this.sending = true;

    if (this.editingComment) {
      this.commentService.update(this.editingComment.id, {
        content: this.commentCtrl.value!.trim()
      }).subscribe({
        next: (updated) => {
          this.emailJsBrowserService.sendModerationNotice(updated, this.currentUserEmail);
          this.syncLocalComments(this.updateCommentInTree(this.comments, updated));
          this.reset();
          this.loadComments();
        },
        error: () => { this.sending = false; }
      });
    } else {
      this.commentService.create(this.listingId, {
        content: this.commentCtrl.value!.trim(),
        parentId: this.replyTo?.id ?? null
      }).subscribe({
        next: (created) => {
          this.emailJsBrowserService.sendModerationNotice(created, this.currentUserEmail);
          this.syncLocalComments(this.addCommentToTree(this.comments, created));
          this.reset();
          this.startAntiSpam();
          this.loadComments();
        },
        error: () => { this.sending = false; }
      });
    }
  }

  startReply(comment: CommentResponse): void {
    this.replyTo = comment;
    this.editingComment = null;
    this.editContentError = '';
    this.commentCtrl.setValue('');
  }

  startEdit(comment: CommentResponse): void {
    if (!this.canEdit(comment)) return;
    this.editingComment = comment;
    this.replyTo = null;
    this.editContentError = '';

    if (comment.moderationStatus === 'MASKED') {
      const original = comment.originalContent?.trim();
      const publicContent = comment.content?.trim();
      if (original && original !== publicContent) {
        this.commentCtrl.setValue(comment.originalContent || '');
        return;
      }

      this.commentCtrl.setValue('');
      this.reloadMaskedEditableContent(comment);
      return;
    }

    this.commentCtrl.setValue(comment.content);
  }

  cancelReply(): void {
    this.replyTo = null;
    this.editingComment = null;
    this.editContentError = '';
    this.commentCtrl.setValue('');
  }

  deleteComment(id: number): void {
    this.commentService.delete(id).subscribe({
      next: () => {
        this.syncLocalComments(this.removeCommentFromTree(this.comments, id));
        this.loadComments();
      }
    });
  }

  isOwner(comment: CommentResponse): boolean {
    return this.currentUserId === comment.userId;
  }

  canDelete(comment: CommentResponse): boolean {
    if (this.currentUserRole === 'admin') return true;
    if (this.isOwner(comment)) return true;
    return this.isListingOwner();
  }

  canEdit(comment: CommentResponse): boolean {
    return this.isOwner(comment) && comment.moderationStatus !== 'BLOCKED';
  }

  canReply(comment: CommentResponse): boolean {
    return comment.moderationStatus !== 'BLOCKED';
  }

  maybeEditMasked(comment: CommentResponse): void {
    if (comment.moderationStatus === 'MASKED' && this.canEdit(comment)) {
      this.startEdit(comment);
    }
  }

  /** Vendeur de l’annonce (tous types : surplus, demande, achat groupé). */
  isListingOwner(): boolean {
    return (
      this.listingCompanyId != null &&
      this.currentCompanyId != null &&
      this.listingCompanyId === this.currentCompanyId
    );
  }

  timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'À l\'instant';
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `Il y a ${days}j`;
    return new Date(dateStr).toLocaleDateString('fr-FR');
  }

  private reset(): void {
    this.commentCtrl.setValue('');
    this.replyTo = null;
    this.editingComment = null;
    this.editContentError = '';
    this.sending = false;
  }

  private startAntiSpam(): void {
    this.antiSpam = true;
    this.spamTimer = setTimeout(() => { this.antiSpam = false; }, 3000);
  }

  private subscribeRealtimeComments(): void {
    const id = Number(this.listingId);
    if (!Number.isFinite(id) || id <= 0 || this.realtimeListingId === id) return;

    this.realtimeSub?.unsubscribe();
    this.realtimeListingId = id;
    this.realtimeSub = this.realtimeService.commentEvents<CommentResponse>(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const comment = event.payload;
        if (!comment) {
          this.loadComments();
          return;
        }
        if (event.type === 'COMMENT_CREATED') {
          if (this.containsComment(this.comments, comment.id)) return;
          this.syncLocalComments(this.addCommentToTree(this.comments, comment));
          return;
        }
        if (event.type === 'COMMENT_UPDATED') {
          this.syncLocalComments(this.updateCommentInTree(this.comments, comment));
          return;
        }
        if (event.type === 'COMMENT_DELETED') {
          this.syncLocalComments(this.removeCommentFromTree(this.comments, comment.id));
          return;
        }
        this.loadComments();
      });
  }

  private containsComment(nodes: CommentResponse[], id: number): boolean {
    for (const node of nodes) {
      if (node.id === id) return true;
      if (node.replies?.length && this.containsComment(node.replies, id)) return true;
    }
    return false;
  }

  private reloadMaskedEditableContent(comment: CommentResponse): void {
    this.commentService.findByListing(this.listingId).subscribe({
      next: (comments) => {
        const fresh = this.findCommentById(comments, comment.id);
        const original = fresh?.originalContent?.trim();
        const publicContent = fresh?.content?.trim();
        if (original && original !== publicContent) {
          this.commentCtrl.setValue(fresh!.originalContent || '');
          this.editContentError = '';
        } else {
          this.editContentError =
            'Le contenu original de ce commentaire masque est indisponible.';
        }
        this.refreshView();
      },
      error: () => {
        this.editContentError =
          'Le contenu original de ce commentaire masque est indisponible.';
        this.refreshView();
      }
    });
  }

  private findCommentById(nodes: CommentResponse[], id: number): CommentResponse | null {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.replies?.length) {
        const found = this.findCommentById(node.replies, id);
        if (found) return found;
      }
    }
    return null;
  }
}
