import { Component, OnInit } from '@angular/core';

export interface User {
  id:        string;
  name:      string;
  email:     string;
  company:   string;
  role:      'enterprise' | 'transporter';
  status:    'active' | 'pending' | 'suspended';
  phone:     string;
  city:      string;
  joined:    string;
  listings:  number;
  orders:    number;
  revenue:   string;
  verified:  boolean;
  avatar:    string;
}

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

  successMsg = '';

  users: User[] = [
    {
      id: 'USR-001', name: 'Slim Ben Ali',       email: 'slim@entreprise.tn',
      company: 'Industrie Slim SARL',    role: 'enterprise',  status: 'active',
      phone: '+216 71 234 567', city: 'Tunis',   joined: '2025-01-10',
      listings: 5, orders: 12, revenue: '14,200', verified: true,  avatar: 'SB'
    },
    {
      id: 'USR-002', name: 'Karim Transport',    email: 'karim@transport.tn',
      company: 'Karim Logistics',               role: 'transporter', status: 'active',
      phone: '+216 72 345 678', city: 'Sfax',    joined: '2025-01-15',
      listings: 0, orders: 34, revenue: '8,750', verified: true,  avatar: 'KT'
    },
    {
      id: 'USR-003', name: 'Mona Trabelsi',      email: 'mona@textile.tn',
      company: 'Textile Mona SA',               role: 'enterprise',  status: 'active',
      phone: '+216 73 456 789', city: 'Sousse',  joined: '2025-01-22',
      listings: 8, orders: 21, revenue: '6,400', verified: true,  avatar: 'MT'
    },
    {
      id: 'USR-004', name: 'Anis Cherif',        email: 'anis@chimie.tn',
      company: 'Chimie Anis SARL',              role: 'enterprise',  status: 'suspended',
      phone: '+216 74 567 890', city: 'Bizerte', joined: '2025-02-01',
      listings: 2, orders: 4,  revenue: '1,200', verified: false, avatar: 'AC'
    },
    {
      id: 'USR-005', name: 'Sana Logistics',     email: 'sana@transport.tn',
      company: 'Sana Transport',                role: 'transporter', status: 'active',
      phone: '+216 75 678 901', city: 'Gabès',   joined: '2025-02-08',
      listings: 0, orders: 19, revenue: '5,100', verified: true,  avatar: 'SL'
    },
    {
      id: 'USR-006', name: 'Yassine Rekik',      email: 'yassine@metal.tn',
      company: 'Métallurgie Sud',               role: 'enterprise',  status: 'pending',
      phone: '+216 76 789 012', city: 'Gabès',   joined: '2025-02-14',
      listings: 1, orders: 0,  revenue: '0',     verified: false, avatar: 'YR'
    },
    {
      id: 'USR-007', name: 'Fatma Jlassi',       email: 'fatma@glass.tn',
      company: 'Vitro Indinya',                 role: 'enterprise',  status: 'active',
      phone: '+216 77 890 123', city: 'Nabeul',  joined: '2025-02-20',
      listings: 3, orders: 7,  revenue: '2,900', verified: true,  avatar: 'FJ'
    },
    {
      id: 'USR-008', name: 'Rami Dridi',         email: 'rami@plastex.tn',
      company: 'Plastex Sfax',                  role: 'enterprise',  status: 'active',
      phone: '+216 78 901 234', city: 'Sfax',    joined: '2025-03-01',
      listings: 4, orders: 9,  revenue: '3,600', verified: true,  avatar: 'RD'
    },
    {
      id: 'USR-009', name: 'Nour Hamdi',         email: 'nour@trans.tn',
      company: 'Nour Express',                  role: 'transporter', status: 'pending',
      phone: '+216 79 012 345', city: 'Tunis',   joined: '2025-03-05',
      listings: 0, orders: 0,  revenue: '0',     verified: false, avatar: 'NH'
    },
    {
      id: 'USR-010', name: 'Khaled Mansouri',    email: 'khaled@fond.tn',
      company: 'Fonderie du Nord',              role: 'enterprise',  status: 'suspended',
      phone: '+216 70 123 456', city: 'Bizerte', joined: '2025-03-10',
      listings: 0, orders: 2,  revenue: '800',   verified: false, avatar: 'KM'
    },
  ];

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
    user.status    = 'active';
    this.successMsg = `${user.name} has been activated.`;
    this.closeDetail();
    this.flash();
  }

  suspend(user: User): void {
    user.status    = 'suspended';
    this.successMsg = `${user.name} has been suspended.`;
    this.closeDetail();
    this.flash();
  }

  approve(user: User): void {
    user.status   = 'active';
    user.verified = true;
    this.successMsg = `${user.name} has been approved.`;
    this.flash();
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
    const name        = this.deletingUser.name;
    this.users        = this.users.filter(u => u.id !== this.deletingUser!.id);
    this.successMsg   = `${name} has been deleted.`;
    this.showDeleteConfirm = false;
    this.deletingUser = null;
    this.flash();
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

  ngOnInit(): void {}
}