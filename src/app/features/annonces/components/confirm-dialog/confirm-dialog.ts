import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.css']
})
export class ConfirmDialog {
  @Input() visible = false;
  @Input() title = 'Confirmation';
  @Input() message = 'Êtes-vous sûr de vouloir effectuer cette action ?';
  @Input() confirmLabel = 'Confirmer';
  @Input() cancelLabel = 'Annuler';
  @Input() danger = true;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
