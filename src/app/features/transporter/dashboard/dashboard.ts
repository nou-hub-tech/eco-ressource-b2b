import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-dashboard', standalone: false, templateUrl: './dashboard.html', styleUrls: ['./dashboard.css'] })
export class Dashboard implements OnInit {
  stats = [
    { label:'Total Trips',       value:'47',    change:'+8 this month', up:true,  icon:'🗺',  bg:'rgba(245,158,11,.1)' },
    { label:'Active Shipments',  value:'3',     change:'On schedule',   up:true,  icon:'📦',  bg:'rgba(52,211,153,.08)' },
    { label:'km Driven',         value:'4,820', change:'+320 this week',up:true,  icon:'📏',  bg:'rgba(96,165,250,.08)' },
    { label:'CO₂ Saved',         value:'84kg',  change:'Via pooling',   up:true,  icon:'🌿',  bg:'rgba(52,211,153,.08)' },
  ];
  trips = [
    { id:'DEL-1046', route:'Gabès → Tunis',    cargo:'Steel Offcuts 2T',  status:'in-transit', earn:420, date:'Today' },
    { id:'DEL-1043', route:'Sousse → Tunis',   cargo:'Aluminum Scrap 1.2T',status:'pickup',    earn:280, date:'Today 15:00' },
    { id:'DEL-1044', route:'Sfax → Bizerte',   cargo:'Plastic Pellets 500kg',status:'delivered',earn:190, date:'Yesterday' },
    { id:'DEL-1041', route:'Tunis → Nabeul',   cargo:'Cardboard 300kg',   status:'delivered',  earn:110, date:'Mar 12' },
  ];
  ngOnInit(): void {}
}