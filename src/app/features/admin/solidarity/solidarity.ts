import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-solidarity', standalone: false, templateUrl: './solidarity.html', styleUrls: ['./solidarity.css'] })
export class Solidarity implements OnInit {
  showModal = false;
  associations = [
    { name:'Recycly Tunisia',    mission:'Household waste sorting & recycling awareness', members:120, donations:4500,  status:'active',   ai:'High donation success rate' },
    { name:'DEBRASY',           mission:'Social inclusion through waste sorting',         members:45,  donations:1200,  status:'active',   ai:'Recommend green subsidy' },
    { name:'Sharek e-Waste',    mission:'Electronic waste collection & redistribution',   members:78,  donations:2800,  status:'active',   ai:'Predicted 40% growth' },
    { name:'Green Bizerte',     mission:'Coastal cleanup and recycling initiative',       members:32,  donations:600,   status:'pending',  ai:'Needs validation docs' },
  ];
  ngOnInit(): void {}
  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}