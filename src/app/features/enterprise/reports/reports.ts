import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-reports', standalone: false, templateUrl: './reports.html', styleUrls: ['./reports.css'] })
export class Reports implements OnInit {
  kpis = [
    { label:'Total Sales',     value:'8,400',  unit:'TND', change:'+18%', up:true,  icon:'💰', bg:'rgba(5,150,105,.1)' },
    { label:'CO₂ Avoided',    value:'2.4',    unit:'T',   change:'+0.3T', up:true, icon:'🌿', bg:'rgba(5,150,105,.1)' },
    { label:'Listings Posted', value:'12',    unit:'',    change:'+3',   up:true,  icon:'📋', bg:'rgba(2,132,199,.1)' },
    { label:'Recycled Volume', value:'4,800', unit:'kg',  change:'+620kg',up:true, icon:'♻', bg:'rgba(124,58,237,.1)' },
  ];
  monthlyBars = [28,45,32,60,48,72,55,80,65,90,78,95];
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  ngOnInit(): void {}
}