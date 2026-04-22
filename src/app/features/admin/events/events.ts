import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrls: ['./events.css']
})
export class AdminEvents implements OnInit {
  showModal = false;
  events = [
    { title:'B2B Industrial Fair 2025',  date:'2025-04-10', location:'Tunis',   participants:42, status:'upcoming', type:'Conference' },
    { title:'Circular Economy Workshop', date:'2025-03-28', location:'Sfax',    participants:18, status:'ongoing',  type:'Workshop'   },
    { title:'Recycling Summit',          date:'2025-02-15', location:'Sousse',  participants:95, status:'done',     type:'Summit'     },
    { title:'Green Logistics Day',       date:'2025-05-05', location:'Bizerte', participants:30, status:'upcoming', type:'Event'      },
  ];
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}