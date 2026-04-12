import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-transactions', standalone: false, templateUrl: './transactions.html', styleUrls: ['./transactions.css'] })
export class Transactions implements OnInit {
  balance = 8250;
  escrow = 620;
  transactions = [
    { id:'TXN-1081', label:'Aluminum Scrap sale',   type:'Escrow Release', amount:1200,  positive:true,  status:'completed', date:'Mar 14' },
    { id:'TXN-1082', label:'Platform commission',   type:'Fee',            amount:-54,   positive:false, status:'completed', date:'Mar 14' },
    { id:'TXN-1083', label:'Steel Offcuts — locked',type:'Escrow Lock',    amount:620,   positive:null,  status:'locked',    date:'Mar 13' },
    { id:'TXN-1084', label:'Karim Transport — DEL', type:'Logistics',      amount:-190,  positive:false, status:'completed', date:'Mar 12' },
    { id:'TXN-1085', label:'Cardboard Bales sale',  type:'Escrow Release', amount:180,   positive:true,  status:'completed', date:'Mar 10' },
  ];
  ngOnInit(): void {}
}