import { Component, OnInit } from '@angular/core';
import {
  AdminApiService,
  SolidarityDto,
  DonationDto,
  CreateAssociationRequest
} from '../../../core/services/admin-api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-solidarity',
  standalone: false,
  templateUrl: './solidarity.html',
  styleUrls: ['./solidarity.css']
})
export class Solidarity implements OnInit {
  // ─── list state ───────────────────────────────────────────────────────────
  associations: SolidarityDto[] = [];
  loading = false;
  listError: string | null = null;

  // ─── Add Association modal ─────────────────────────────────────────────────
  showModal = false;
  submitting = false;
  formError: string | null = null;
  newAssociation: CreateAssociationRequest = {
    name: '',
    mission: '',
    members: 0,
    donations: 0,
    statusLabel: 'active',
    aiInsight: '',
    goalAmount: undefined
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
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
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
      },
      error: (err) => {
        console.error('Error fetching associations', err);
        this.listError =
          err.status === 403
            ? 'Access denied — please log in as an admin.'
            : 'Failed to load associations.';
        this.loading = false;
      }
    });
  }

  // ─── Add Association modal ─────────────────────────────────────────────────
  openModal(): void {
    this.showModal = true;
    this.formError = null;
    this.newAssociation = {
      name: '',
      mission: '',
      members: 0,
      donations: 0,
      statusLabel: 'active',
      aiInsight: '',
      goalAmount: undefined
    };
  }

  closeModal(): void {
    this.showModal = false;
    this.formError = null;
  }

  addAssociation(): void {
    if (!this.newAssociation.name?.trim() || !this.newAssociation.mission?.trim()) return;

    this.submitting = true;
    this.formError = null;

    const payload: CreateAssociationRequest = {
      name: this.newAssociation.name.trim(),
      mission: this.newAssociation.mission.trim(),
      members: Number(this.newAssociation.members) || 0,
      donations: Number(this.newAssociation.donations) || 0,
      statusLabel: this.newAssociation.statusLabel || 'active',
      aiInsight: this.newAssociation.aiInsight?.trim() || '',
      goalAmount: this.newAssociation.goalAmount != null
        ? Number(this.newAssociation.goalAmount)
        : undefined
    };

    this.adminApi.createSolidarity(payload).subscribe({
      next: (val) => {
        this.associations.push(val);
        this.submitting = false;  // reset BEFORE closing so ngForm isn't destroyed while dirty
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to create association', err);
        if (err.status === 403) {
          this.formError = 'Access denied — you must be logged in as an admin.';
        } else if (err.status === 400 && err.error) {
          // Spring validation errors come as: { field: 'name', message: '...' }[] or { message: '...' }
          const body = err.error;
          if (Array.isArray(body) && body.length > 0) {
            this.formError = body.map((e: any) => e.message || e.defaultMessage).join(', ');
          } else {
            this.formError = body?.message || 'Validation failed. Please check all fields.';
          }
        } else {
          this.formError = 'Failed to create association. Please try again.';
        }
        this.submitting = false;
      }
    });
  }

  // ─── Donate modal ──────────────────────────────────────────────────────────
  openDonateModal(id: number): void {
    this.selectedAssociationId = id;
    this.newDonation = { amount: 0, message: '' };
    this.donateError = null;
    this.showDonateModal = true;
  }

  closeDonateModal(): void {
    this.showDonateModal = false;
    this.selectedAssociationId = null;
    this.donateError = null;
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
        this.donating = false;  // reset BEFORE closing
        this.closeDonateModal();
      },
      error: (err) => {
        console.error('Failed to create donation', err);
        this.donateError =
          err.status === 403
            ? 'Access denied — you must be logged in as an admin.'
            : 'Failed to process donation. Please try again.';
        this.donating = false;
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

    this.adminApi.getDonationsByAssociation(association.id).subscribe({
      next: (donations) => {
        // Sort donations by date descending (newest first) if createdAt is present
        this.associationDonations = donations.sort((a, b) => {
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.detailsLoading = false;
      },
      error: (err) => {
        console.error('Failed to load donations', err);
        this.detailsError = 'Failed to load donation details.';
        this.detailsLoading = false;
      }
    });
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedAssociationDetails = null;
    this.associationDonations = [];
    this.detailsError = null;
  }
}