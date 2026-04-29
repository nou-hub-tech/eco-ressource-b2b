import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { CommentResponse } from '../../../../core/models/annonces.interfaces';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-comment-thread',
  standalone: false,
  templateUrl: './comment-thread.html',
  styleUrls: ['./comment-thread.css']
})
export class CommentThread implements OnInit, OnDestroy {
  @Input() listingId!: number;

  comments: CommentResponse[] = [];
  commentCtrl = new FormControl('', [Validators.required, Validators.maxLength(2000)]);
  loading = false;
  sending = false;
  antiSpam = false;
  replyTo: CommentResponse | null = null;
  editingComment: CommentResponse | null = null;
  currentUserId: number | null = null;
  currentUserRole: string | null = null;
  private spamTimer: any;

  constructor(
    private readonly commentService: CommentService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.currentUserId = parseInt(user.id, 10);
      this.currentUserRole = user.role;
    }
    this.loadComments();
  }

  ngOnDestroy(): void {
    if (this.spamTimer) clearTimeout(this.spamTimer);
  }

  loadComments(): void {
    this.loading = true;
    this.commentService.findByListing(this.listingId).subscribe({
      next: (data) => { this.comments = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  submit(): void {
    if (this.commentCtrl.invalid || this.antiSpam || !this.commentCtrl.value?.trim()) return;

    this.sending = true;

    if (this.editingComment) {
      this.commentService.update(this.editingComment.id, {
        content: this.commentCtrl.value!.trim()
      }).subscribe({
        next: () => { this.reset(); this.loadComments(); },
        error: () => { this.sending = false; }
      });
    } else {
      this.commentService.create(this.listingId, {
        content: this.commentCtrl.value!.trim(),
        parentId: this.replyTo?.id ?? null
      }).subscribe({
        next: () => { this.reset(); this.startAntiSpam(); this.loadComments(); },
        error: () => { this.sending = false; }
      });
    }
  }

  startReply(comment: CommentResponse): void {
    this.replyTo = comment;
    this.editingComment = null;
    this.commentCtrl.setValue('');
  }

  startEdit(comment: CommentResponse): void {
    this.editingComment = comment;
    this.replyTo = null;
    this.commentCtrl.setValue(comment.content);
  }

  cancelReply(): void {
    this.replyTo = null;
    this.editingComment = null;
    this.commentCtrl.setValue('');
  }

  deleteComment(id: number): void {
    this.commentService.delete(id).subscribe({
      next: () => this.loadComments()
    });
  }

  isOwner(comment: CommentResponse): boolean {
    return this.currentUserId === comment.userId;
  }

  canDelete(comment: CommentResponse): boolean {
    return this.isOwner(comment) || this.currentUserRole === 'admin';
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
    this.sending = false;
  }

  private startAntiSpam(): void {
    this.antiSpam = true;
    this.spamTimer = setTimeout(() => { this.antiSpam = false; }, 3000);
  }
}
