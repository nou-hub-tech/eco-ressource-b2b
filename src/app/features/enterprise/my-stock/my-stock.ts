import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-my-stock', standalone: false, templateUrl: './my-stock.html', styleUrls: ['./my-stock.css'] })
export class MyStock implements OnInit {
  search = ''; showModal = false;
  items = [
    { name:'Aluminum Scrap',  category:'Metal',   qty:2000, unit:'kg', condition:'Good', status:'listed',    ai:'Shortage in 2 weeks' },
    { name:'Steel Offcuts',   category:'Metal',   qty:800,  unit:'kg', condition:'Fair', status:'listed',    ai:'Optimal price: 780/T' },
    { name:'Cardboard Bales', category:'Paper',   qty:1000, unit:'kg', condition:'Good', status:'reserved',  ai:'High demand period' },
    { name:'Plastic Waste',   category:'Plastic', qty:200,  unit:'kg', condition:'Fair', status:'unlisted',  ai:'Post now — price up' },
  ];
  get filtered() { return this.items.filter(i => i.name.toLowerCase().includes(this.search.toLowerCase())); }
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}