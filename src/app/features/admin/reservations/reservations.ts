import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-reservations', standalone: false, templateUrl: './reservations.html', styleUrls: ['./reservations.css'] })
export class Reservations implements OnInit {
  search = ''; showModal = false;
  reservations = [
    { id:'RES-001', type:'Machine',   item:'CNC Milling 3-axis', company:'Industrie Slim',  from:'2025-03-20', to:'2025-03-22', price:450,  status:'confirmed' },
    { id:'RES-002', type:'Space',     item:'Warehouse Zone B',   company:'Textile Mona',   from:'2025-03-18', to:'2025-03-25', price:800,  status:'active' },
    { id:'RES-003', type:'Machine',   item:'Hydraulic Press',    company:'Métallurgie Sud',from:'2025-03-22', to:'2025-03-23', price:200,  status:'pending' },
    { id:'RES-004', type:'Material',  item:'Aluminum Batch 500kg',company:'Chimie Anis',   from:'2025-03-15', to:'2025-03-15', price:600,  status:'completed' },
    { id:'RES-005', type:'Machine',   item:'Laser Cutter',       company:'Industrie Slim', from:'2025-03-25', to:'2025-03-26', price:350,  status:'pending' },
  ];
  get filtered() { return this.reservations.filter(r => r.item.toLowerCase().includes(this.search.toLowerCase()) || r.company.toLowerCase().includes(this.search.toLowerCase())); }
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}