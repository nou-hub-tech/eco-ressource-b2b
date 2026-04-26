import { Component, OnInit } from '@angular/core';
import { AdminApiService, AdminUserDto } from '../../../core/services/admin-api.service';

export type User = AdminUserDto;

@Component({
  selector:    'app-users',
  standalone:  false,
  templateUrl: './users.html',
  styleUrls:   ['./users.css']
})
export class Users implements OnInit {

  search      = '';
  filterRole  = 'all';
  filterStatus = 'all';

  showDetailModal  = false;
  showDeleteConfirm = false;
  selectedUser: User | null = null;
  deletingUser: User | null = null;

<<<<<<< HEAD
  /** Non-null accessor for template — used inside *ngIf="selectedUser" */
  get su(): User { return this.selectedUser!; }

=======
>>>>>>> origin/integration/gestion-annonce-et-product-v2
  successMsg = '';

  users: User[] = [];

  constructor(
    private adminApiService: AdminApiService
  ) {}

  get filtered(): User[] {
    return this.users.filter(u => {
      const matchSearch =
        u.name.toLowerCase().includes(this.search.toLowerCase()) ||
        u.email.toLowerCase().includes(this.search.toLowerCase()) ||
        u.company.toLowerCase().includes(this.search.toLowerCase()) ||
        u.id.toLowerCase().includes(this.search.toLowerCase());
      const matchRole   = this.filterRole   === 'all' || u.role   === this.filterRole;
      const matchStatus = this.filterStatus === 'all' || u.status === this.filterStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }

  get totalEnterprise():  number { return this.users.filter(u => u.role === 'enterprise').length; }
  get totalTransporter(): number { return this.users.filter(u => u.role === 'transporter').length; }
  get totalActive():      number { return this.users.filter(u => u.status === 'active').length; }
  get totalPending():     number { return this.users.filter(u => u.status === 'pending').length; }
  get totalSuspended():   number { return this.users.filter(u => u.status === 'suspended').length; }

  /* ── DETAIL MODAL ── */
  openDetail(user: User): void {
    this.selectedUser    = user;
    this.showDetailModal = true;
  }
  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedUser    = null;
  }

  /* ── STATUS ACTIONS ── */
  activate(user: User): void {
    const userId = AdminApiService.parseUserNumericId(user.id);
    this.adminApiService.updateUserStatus(userId, 'active').subscribe(updatedUser => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.successMsg = `${user.name} has been activated.`;
      this.closeDetail();
      this.flash();
    });
  }

  suspend(user: User): void {
    const userId = AdminApiService.parseUserNumericId(user.id);
    this.adminApiService.updateUserStatus(userId, 'suspended').subscribe(updatedUser => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.successMsg = `${user.name} has been suspended.`;
      this.closeDetail();
      this.flash();
    });
  }

  approve(user: User): void {
    const userId = AdminApiService.parseUserNumericId(user.id);
    this.adminApiService.updateUserStatus(userId, 'active').subscribe(updatedUser => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index] = { ...updatedUser, verified: true };
      }
      this.successMsg = `${user.name} has been approved.`;
      this.flash();
    });
  }

  /* ── DELETE ── */
  confirmDelete(user: User, event: Event): void {
    event.stopPropagation();
    this.deletingUser      = user;
    this.showDeleteConfirm = true;
  }
  cancelDelete(): void {
    this.deletingUser      = null;
    this.showDeleteConfirm = false;
  }
  executeDelete(): void {
    if (!this.deletingUser) return;
    const name = this.deletingUser.name;
    const userId = AdminApiService.parseUserNumericId(this.deletingUser.id);
    
    this.adminApiService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(u => u.id !== this.deletingUser!.id);
      this.successMsg = `${name} has been deleted.`;
      this.showDeleteConfirm = false;
      this.deletingUser = null;
      this.flash();
    });
  }

  private flash(): void {
    setTimeout(() => this.successMsg = '', 3000);
  }

  /* ── HELPERS ── */
  roleClass(role: string): string {
    return role === 'enterprise' ? 'badge-success' : 'badge-info';
  }
  statusClass(status: string): string {
    return status === 'active'    ? 'badge-success'
         : status === 'pending'   ? 'badge-warning'
         : 'badge-danger';
  }
  roleLabel(role: string): string {
    return role === 'enterprise' ? 'Enterprise' : 'Transporter';
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.adminApiService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}