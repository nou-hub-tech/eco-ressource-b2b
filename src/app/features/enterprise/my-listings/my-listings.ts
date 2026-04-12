import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-my-listings', standalone: false, templateUrl: './my-listings.html', styleUrls: ['./my-listings.css'] })
export class MyListings implements OnInit {
  showModal = false;
  listings = [
    { id:'LST-001', title:'Aluminum Scrap 2T',    category:'Metal',   price:1200, qty:'2,000 kg', views:48, enquiries:5, status:'active',  posted:'Mar 1' },
    { id:'LST-002', title:'Steel Offcuts 800kg',  category:'Metal',   price:620,  qty:'800 kg',   views:31, enquiries:3, status:'active',  posted:'Mar 5' },
    { id:'LST-003', title:'Cardboard Bales 1T',  category:'Paper',   price:180,  qty:'1,000 kg', views:12, enquiries:1, status:'pending', posted:'Mar 8' },
    { id:'LST-004', title:'Plastic Waste 200kg', category:'Plastic', price:60,   qty:'200 kg',   views:7,  enquiries:0, status:'draft',   posted:'Mar 10' },
  ];
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}