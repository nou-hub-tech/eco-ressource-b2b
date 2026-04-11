import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-shipments', standalone: false, templateUrl: './shipments.html', styleUrls: ['./shipments.css'] })
export class Shipments implements OnInit {
  shipments = [
    { id:'DEL-1046', client:'Industrie Slim',  product:'Steel Offcuts 2T',    from:'Gabès', to:'Tunis',  status:'in-transit', pickup:'Today 09:00',  delivery:'Today 17:00',  earn:420 },
    { id:'DEL-1043', client:'Textile Mona',    product:'Aluminum Scrap 1.2T', from:'Sousse',to:'Tunis',  status:'pickup',     pickup:'Today 15:00',  delivery:'Today 19:00',  earn:280 },
    { id:'DEL-1044', client:'Chimie Anis',     product:'Plastic Pellets 500kg',from:'Sfax', to:'Bizerte',status:'delivered',  pickup:'Yesterday',    delivery:'Yesterday',    earn:190 },
  ];
  ngOnInit(): void {}
}