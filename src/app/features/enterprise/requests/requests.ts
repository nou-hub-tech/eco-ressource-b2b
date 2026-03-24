import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  standalone: false,
  templateUrl: './requests.html',
  styleUrls: ['./requests.css']
})
export class Requests implements OnInit {

  filter = 'all';

  requests = [
    {
      id: 'REQ-001',
      from: 'Textile Mona SA',
      avatar: 'TM',
      item: 'CNC Milling Machine',
      type: 'Machine Rental',
      from_date: '2025-03-25',
      to_date: '2025-03-27',
      duration: '2 days',
      price: 400,
      message: 'We need your CNC machine for a short production run. We will ensure full care and return on time.',
      status: 'pending',
      received: '10 min ago',
      urgent: true
    },
    {
      id: 'REQ-002',
      from: 'Chimie Anis SARL',
      avatar: 'CA',
      item: 'Warehouse Zone B — 200m²',
      type: 'Space Rental',
      from_date: '2025-04-01',
      to_date: '2025-04-15',
      duration: '15 days',
      price: 1200,
      message: 'Temporary storage needed for chemical raw materials. Certified handling team.',
      status: 'pending',
      received: '2 hrs ago',
      urgent: false
    },
    {
      id: 'REQ-003',
      from: 'Métallurgie Sud',
      avatar: 'MS',
      item: 'Aluminum Scrap — 500kg batch',
      type: 'Material Purchase',
      from_date: '2025-03-22',
      to_date: '2025-03-22',
      duration: 'One-time',
      price: 600,
      message: 'Interested in buying 500kg from your current batch. Can arrange pickup.',
      status: 'accepted',
      received: 'Yesterday',
      urgent: false
    },
    {
      id: 'REQ-004',
      from: 'Vitro Indinya',
      avatar: 'VI',
      item: 'Hydraulic Press',
      type: 'Machine Rental',
      from_date: '2025-03-18',
      to_date: '2025-03-19',
      duration: '1 day',
      price: 180,
      message: 'Quick rental needed for a single day production batch.',
      status: 'declined',
      received: '3 days ago',
      urgent: false
    },
  ];

  get filtered() {
    if (this.filter === 'all') return this.requests;
    return this.requests.filter(r => r.status === this.filter);
  }

  get pendingCount() {
    return this.requests.filter(r => r.status === 'pending').length;
  }

  accept(req: any): void { req.status = 'accepted'; }
  decline(req: any): void { req.status = 'declined'; }

  ngOnInit(): void {}
}