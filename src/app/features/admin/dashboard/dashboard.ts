import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  stats = [
    { label:'Total Users',      value:'1,248', change:'+12% this month', up:true,  icon:'👥', bg:'rgba(124,58,237,.15)' },
    { label:'Active Listings',  value:'342',   change:'+8% this month',  up:true,  icon:'📋', bg:'rgba(52,211,153,.1)'  },
    { label:'Deliveries Today', value:'58',    change:'-3% vs yesterday',up:false, icon:'🚚', bg:'rgba(251,191,36,.1)'  },
    { label:'Revenue (TND)',    value:'84.2K', change:'+21% this month', up:true,  icon:'💰', bg:'rgba(96,165,250,.1)'  },
  ];

  recentUsers = [
    { name:'Slim Ben Ali',    company:'Industrie Slim SARL',  role:'enterprise',  status:'active',    date:'Today'      },
    { name:'Karim Transport', company:'Karim Logistics',       role:'transporter', status:'pending',   date:'Today'      },
    { name:'Mona Trabelsi',   company:'Textile Mona SA',       role:'enterprise',  status:'active',    date:'Yesterday'  },
    { name:'Anis Cherif',     company:'Chimie Anis SARL',      role:'enterprise',  status:'suspended', date:'2 days ago' },
    { name:'Sana Logistics',  company:'Sana Transport',        role:'transporter', status:'active',    date:'3 days ago' },
  ];

  recentListings = [
    { title:'Aluminum Scrap 2T',    company:'Industrie Slim',  category:'Metal',   price:1200, status:'active'  },
    { title:'Plastic Pellets 500kg', company:'Chimie Anis',    category:'Plastic', price:340,  status:'pending' },
    { title:'Cardboard Bales 1T',   company:'Textile Mona',    category:'Paper',   price:180,  status:'active'  },
    { title:'Steel Offcuts 800kg',  company:'Métallurgie Sud', category:'Metal',   price:620,  status:'active'  },
  ];

  activity = [
    { icon:'✓', text:'New listing approved — Aluminum Scrap 2T', time:'2 min ago',  bg:'rgba(52,211,153,.1)',  bdr:'rgba(52,211,153,.2)'  },
    { icon:'⚠', text:'Escrow payment released — 1,200 TND',      time:'8 min ago',  bg:'rgba(251,191,36,.1)', bdr:'rgba(251,191,36,.2)'  },
    { icon:'👤', text:'New registration pending — Karim Transport',time:'15 min ago', bg:'rgba(124,58,237,.1)', bdr:'rgba(124,58,237,.2)'  },
    { icon:'🚫', text:'User account suspended — Anis Cherif',     time:'1 hr ago',   bg:'rgba(239,68,68,.08)', bdr:'rgba(239,68,68,.15)'  },
  ];

  ngOnInit(): void {}
}