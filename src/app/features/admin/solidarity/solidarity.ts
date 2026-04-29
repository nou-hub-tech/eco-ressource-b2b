import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  AdminApiService,
  SolidarityDto,
  DonationDto,
  SolidarityAssociationRequest
} from '../../../core/services/admin-api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-solidarity',
  standalone: false,
  templateUrl: './solidarity.html',
  styleUrls: ['./solidarity.css']
})
export class Solidarity implements OnInit {
  // ─── user context ──────────────────────────────────────────────────────────
  currentUserId: number | null = null;
  isAdmin = false;

  // ─── list state ───────────────────────────────────────────────────────────
  associations: SolidarityDto[] = [];
  loading = false;
  listError: string | null = null;

  // ─── Add Association modal ─────────────────────────────────────────────────
  showModal = false;
  submitting = false;
  formError: string | null = null;
  isEditMode = false;
  editingId: number | null = null;
  newAssociation: SolidarityAssociationRequest = {
    name: '',
    mission: '',
    members: 0,
    donations: 0,
    statusLabel: 'active',
    aiInsight: '',
    goalAmount: 0
  };

  // ─── Donate modal ──────────────────────────────────────────────────────────
  showDonateModal = false;
  donating = false;
  donateError: string | null = null;
  selectedAssociationId: number | null = null;
  newDonation = { amount: 0, message: '' };

  // ─── Details modal ────────────────────────────────────────────────────────
  showDetailsModal = false;
  detailsLoading = false;
  detailsError: string | null = null;
  selectedAssociationDetails: SolidarityDto | null = null;
  associationDonations: DonationDto[] = [];

  constructor(
    private readonly adminApi: AdminApiService,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.currentUserId = user.id ? AdminApiService.parseUserNumericId(user.id) : null;
      this.isAdmin = user.role === 'admin' || (user as any).role === 'ROLE_ADMIN';
    }
    this.loadAssociations();
  }

  // ─── Load ──────────────────────────────────────────────────────────────────
  loadAssociations(): void {
    this.loading = true;
    this.listError = null;
    this.adminApi.getSolidarity().subscribe({
      next: (data) => {
        this.associations = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching associations', err);
        this.listError =
          err.status === 403
            ? 'Access denied.'
            : 'Failed to load associations.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ─── Add Association modal ─────────────────────────────────────────────────
  openModal(): void {
    this.isEditMode = false;
    this.editingId = null;
    this.newAssociation = {
      name: '',
      mission: '',
      members: 0,
      donations: 0,
      statusLabel: 'active',
      aiInsight: '',
      goalAmount: 0
    };
    this.formError = null;
    this.showModal = true;
    this.cdr.detectChanges();
  }

  openEditModal(assoc: SolidarityDto): void {
    this.isEditMode = true;
    this.editingId = assoc.id;
    this.newAssociation = {
      name: assoc.name,
      mission: assoc.mission,
      members: assoc.members,
      donations: assoc.donations,
      statusLabel: assoc.statusLabel,
      aiInsight: assoc.aiInsight || '',
      goalAmount: assoc.goalAmount || 0
    };
    this.formError = null;
    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.editingId = null;
    this.formError = null;
    this.cdr.detectChanges();
  }

  addAssociation(): void {
    if (this.submitting) return;
    this.submitting = true;
    this.formError = null;

    if (this.isEditMode && this.editingId) {
      this.adminApi.updateAssociation(this.editingId, this.newAssociation).subscribe({
        next: (updated) => {
          const idx = this.associations.findIndex(a => a.id === this.editingId);
          if (idx !== -1) {
            this.associations[idx] = updated;
          }
          this.closeModal();
          this.submitting = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error updating association:', err);
          this.formError = 'Failed to update association. Please try again.';
          this.submitting = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.adminApi.createAssociation(this.newAssociation).subscribe({
        next: (created) => {
          this.associations.unshift(created);
          this.closeModal();
          this.submitting = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error creating association:', err);
          this.formError = 'Failed to create association. Please try again.';
          this.submitting = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  // ─── Donate modal ──────────────────────────────────────────────────────────
  openDonateModal(id: number): void {
    this.selectedAssociationId = id;
    this.newDonation = { amount: 0, message: '' };
    this.donateError = null;
    this.showDonateModal = true;
    this.cdr.detectChanges();
  }

  closeDonateModal(): void {
    this.showDonateModal = false;
    this.selectedAssociationId = null;
    this.donateError = null;
    this.cdr.detectChanges();
  }

  submitDonation(): void {
    if (!this.selectedAssociationId || !this.newDonation.amount || this.newDonation.amount <= 0) return;

    this.donating = true;
    this.donateError = null;

    const payload: DonationDto = {
      associationId: this.selectedAssociationId,
      amount: Number(this.newDonation.amount),
      message: this.newDonation.message?.trim() || undefined,
      userId: this.authService.currentUser?.id
        ? parseInt(this.authService.currentUser.id, 10)
        : undefined
    };

    this.adminApi.createDonation(payload).subscribe({
      next: (donation) => {
        const assoc = this.associations.find(a => a.id === this.selectedAssociationId);
        if (assoc) {
          assoc.donations = (assoc.donations || 0) + donation.amount;
        }
        this.donating = false;
        this.closeDonateModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to create donation', err);
        this.donateError = 'Failed to process donation.';
        this.donating = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ─── Details modal ────────────────────────────────────────────────────────
  openDetailsModal(association: SolidarityDto): void {
    this.selectedAssociationDetails = association;
    this.showDetailsModal = true;
    this.detailsLoading = true;
    this.detailsError = null;
    this.associationDonations = [];
    this.cdr.detectChanges();

    this.adminApi.getDonationsByAssociation(association.id).subscribe({
      next: (donations) => {
        this.associationDonations = donations.sort((a, b) => {
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.detailsLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load donations', err);
        this.detailsError = 'Failed to load donation details.';
        this.detailsLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedAssociationDetails = null;
    this.associationDonations = [];
    this.detailsError = null;
    this.cdr.detectChanges();
  }

  // ─── Delete ───────────────────────────────────────────────────────────────
  deleteAssociation(id: number): void {
    if (!confirm('Are you sure you want to delete this association?')) {
      return;
    }
    
    this.adminApi.deleteAssociation(id).subscribe({
      next: () => {
        this.associations = this.associations.filter(a => a.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to delete association', err);
        alert('Failed to delete association.');
        this.cdr.detectChanges();
      }
    });
  }

  deleteDonation(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this donation?')) return;

    this.adminApi.deleteDonation(id).subscribe({
      next: () => {
        const donation = this.associationDonations.find(d => d.id === id);
        if (donation && this.selectedAssociationDetails) {
          this.selectedAssociationDetails.donations = (this.selectedAssociationDetails.donations || 0) - donation.amount;
          const assocInList = this.associations.find(a => a.id === this.selectedAssociationDetails?.id);
          if (assocInList) {
            assocInList.donations = this.selectedAssociationDetails.donations;
          }
        }
        this.associationDonations = this.associationDonations.filter(d => d.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to delete donation', err);
        const errorMsg = err.error?.message || err.message || 'Unknown error';
        alert('Failed to delete donation: ' + errorMsg);
        this.cdr.detectChanges();
      }
    });
  }
}