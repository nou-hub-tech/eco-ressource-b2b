import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-my-reservations', standalone: false, templateUrl: './my-reservations.html', styleUrls: ['./my-reservations.css'] })
export class MyReservations implements OnInit {
  showModal = false;
  reservations = [
    { id:'RES-001', type:'Machine', item:'CNC Milling 3-axis', from:'2025-03-20', to:'2025-03-22', price:450,  status:'confirmed' },
    { id:'RES-003', type:'Machine', item:'Hydraulic Press',    from:'2025-03-22', to:'2025-03-23', price:200,  status:'pending' },
    { id:'RES-005', type:'Machine', item:'Laser Cutter',       from:'2025-03-25', to:'2025-03-26', price:350,  status:'pending' },
  ];
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}