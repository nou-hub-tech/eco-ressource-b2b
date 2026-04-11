import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-marketplace', standalone: false, templateUrl: './marketplace.html', styleUrls: ['./marketplace.css'] })
export class Marketplace implements OnInit {
  search = ''; filterCat = 'all'; showModal = false;
  listings = [
    { id:1, title:'Aluminum Scrap 2T',     company:'Industrie Slim',   category:'Metal',   price:1200, qty:'2,000 kg', status:'active',  ai:'High demand — act fast' },
    { id:2, title:'PET Plastic Pellets',   company:'Chimie Anis',      category:'Plastic', price:340,  qty:'500 kg',   status:'active',  ai:'Price drop expected' },
    { id:3, title:'Cardboard Bales 1T',   company:'Textile Mona',     category:'Paper',   price:180,  qty:'1,000 kg', status:'active',  ai:'Best value match' },
    { id:4, title:'Steel Offcuts 800kg',  company:'Métallurgie Sud',  category:'Metal',   price:620,  qty:'800 kg',   status:'active',  ai:'Optimal price' },
    { id:5, title:'Glass Cullet 300kg',   company:'Vitro Indinya',    category:'Glass',   price:90,   qty:'300 kg',   status:'active',  ai:'Recommend reallocation' },
    { id:6, title:'Fabric Offcuts 150kg', company:'Textile Mona',     category:'Textile', price:55,   qty:'150 kg',   status:'active',  ai:'Surplus confirmed' },
  ];
  categories = ['all','Metal','Plastic','Paper','Glass','Textile'];
  get filtered() {
    return this.listings.filter(l => {
      const ms = l.title.toLowerCase().includes(this.search.toLowerCase()) || l.company.toLowerCase().includes(this.search.toLowerCase());
      const mc = this.filterCat === 'all' || l.category === this.filterCat;
      return ms && mc;
    });
  }
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}