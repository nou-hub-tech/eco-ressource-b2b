import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listings',
  standalone: false,
  templateUrl: './listings.html',
  styleUrls: ['./listings.css']
})
export class Listings implements OnInit {
  search = '';
  filterStatus = 'all';
  showModal = false;

  listings = [
    {
      id: 'LST-001',
      title: 'Aluminum Scrap 2T',
      company: 'Industrie Slim',
      category: 'Metal',
      price: 1200,
      status: 'active',
      posted: 'Mar 1',
      ai: 'Detected: Metal via image scan'
    },
    {
      id: 'LST-002',
      title: 'Plastic Pellets 500kg',
      company: 'Chimie Anis',
      category: 'Plastic',
      price: 340,
      status: 'pending',
      posted: 'Mar 5',
      ai: 'Auto-filled from QR code'
    },
    {
      id: 'LST-003',
      title: 'Cardboard Bales 1T',
      company: 'Textile Mona',
      category: 'Paper',
      price: 180,
      status: 'active',
      posted: 'Mar 8',
      ai: 'Price suggestion: 195 TND'
    },
    {
      id: 'LST-004',
      title: 'Steel Offcuts 800kg',
      company: 'Métallurgie Sud',
      category: 'Metal',
      price: 620,
      status: 'active',
      posted: 'Mar 10',
      ai: 'High demand detected'
    },
    {
      id: 'LST-005',
      title: 'Glass Cullet 300kg',
      company: 'Vitro Indinya',
      category: 'Glass',
      price: 90,
      status: 'rejected',
      posted: 'Mar 11',
      ai: 'Incomplete documentation'
    },
    {
      id: 'LST-006',
      title: 'Fabric Offcuts 150kg',
      company: 'Textile Mona',
      category: 'Textile',
      price: 55,
      status: 'pending',
      posted: 'Mar 12',
      ai: 'Surplus confirmed by AI'
    }
  ];

  get filtered() {
    return this.listings.filter(l => {
      const matchSearch =
        l.title.toLowerCase().includes(this.search.toLowerCase()) ||
        l.company.toLowerCase().includes(this.search.toLowerCase());
      const matchStatus =
        this.filterStatus === 'all' || l.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
  }

  ngOnInit(): void {}

  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }

  approve(l: any): void { l.status = 'active'; }
  reject(l: any): void  { l.status = 'rejected'; }
}