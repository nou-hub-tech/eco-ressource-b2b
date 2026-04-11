import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-trips', standalone: false, templateUrl: './trips.html', styleUrls: ['./trips.css'] })
export class Trips implements OnInit {
  showModal = false;
  trips = [
    { id:'DEL-1046', from:'Gabès',  to:'Tunis',   cargo:'Steel Offcuts 2T',    weight:'2,000kg', earn:420, status:'in-transit', date:'Today',      co2:'28kg' },
    { id:'DEL-1043', from:'Sousse', to:'Tunis',   cargo:'Aluminum Scrap 1.2T', weight:'1,200kg', earn:280, status:'pickup',     date:'Today 15:00', co2:'18kg' },
    { id:'DEL-1044', from:'Sfax',   to:'Bizerte', cargo:'Plastic Pellets 500kg',weight:'500kg',  earn:190, status:'delivered',  date:'Yesterday',   co2:'9kg'  },
    { id:'DEL-1041', from:'Tunis',  to:'Nabeul',  cargo:'Cardboard 300kg',     weight:'300kg',   earn:110, status:'delivered',  date:'Mar 12',      co2:'6kg'  },
    { id:'DEL-1038', from:'Sfax',   to:'Tunis',   cargo:'Glass Cullet 300kg',  weight:'300kg',   earn:95,  status:'delivered',  date:'Mar 10',      co2:'5kg'  },
  ];
  aiOpportunity = { from:'Sfax', to:'Tunis', cargo:'Empty return match — load available', earn:180 };
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}