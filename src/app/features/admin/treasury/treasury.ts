import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

@Component({
  selector: 'app-treasury',
  standalone: false,
  template: `
    <div class="page-wrapper">
      <div class="page-header">
        <h1>Treasury Overview</h1>
        <p>Platform-wide treasury statistics</p>
      </div>
      <div class="stats-grid">
        <div class="stat-card" *ngFor="let s of stats">
          <div class="stat-icon" [style.background]="s.bg">{{ s.icon }}</div>
          <div>
            <div class="stat-value">{{ s.value }} {{ s.unit }}</div>
            <div class="stat-label">{{ s.label }}</div>
            <div class="stat-change" [class.up]="s.up" [class.down]="!s.up">{{ s.change }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.stat-change.up{color:#059669}.stat-change.down{color:#dc2626}`]
})
export class Treasury implements OnInit {
  stats = [
    { label:'Total Revenue', value:'84,200', unit:'TND', change:'+21%', up:true,  icon:'💰', bg:'rgba(124,58,237,.12)' },
    { label:'Escrow Locked', value:'12,400', unit:'TND', change:'+5%',  up:true,  icon:'🔒', bg:'rgba(251,191,36,.1)'  },
    { label:'Transactions',  value:'248',    unit:'',    change:'+18%', up:true,  icon:'💳', bg:'rgba(96,165,250,.1)'  },
    { label:'Pending',       value:'6,800',  unit:'TND', change:'-3%',  up:false, icon:'⏳', bg:'rgba(239,68,68,.1)'   },
  ];
  ngOnInit(): void {}
}
=======
@Component({ selector: 'app-treasury', standalone: false, templateUrl: './treasury.html', styleUrls: ['./treasury.css'] })
export class Treasury implements OnInit {
  stats = [
    { label:'Total Revenue', value:'84,200', unit:'TND', change:'+21%', up:true, icon:'💰', bg:'rgba(124,58,237,.12)' },
    { label:'Escrow Locked', value:'12,400', unit:'TND', change:'+5%',  up:true, icon:'🔒', bg:'rgba(251,191,36,.1)' },
    { label:'Transactions',  value:'248',    unit:'',    change:'+18%', up:true, icon:'💳', bg:'rgba(96,165,250,.1)' },
    { label:'Pending',       value:'6,800',  unit:'TND', change:'-3%',  up:false,icon:'⏳', bg:'rgba(239,68,68,.1)' },
  ];
  transactions = [
    { id:'TXN-1081', from:'Industrie Slim',  to:'Chimie Anis',    amount:1200, type:'Escrow Release', status:'completed', date:'2025-03-14' },
    { id:'TXN-1082', from:'Textile Mona',    to:'Platform Fee',   amount:54,   type:'Commission',     status:'completed', date:'2025-03-14' },
    { id:'TXN-1083', from:'Métallurgie Sud', to:'Escrow',         amount:620,  type:'Escrow Lock',    status:'locked',    date:'2025-03-13' },
    { id:'TXN-1084', from:'Vitro Indinya',   to:'Karim Transport',amount:190,  type:'Logistics',      status:'completed', date:'2025-03-12' },
    { id:'TXN-1085', from:'Chimie Anis',     to:'Escrow',         amount:3400, type:'Escrow Lock',    status:'locked',    date:'2025-03-11' },
  ];
  ngOnInit(): void {}
}
>>>>>>> origin/integration/gestion-annonce-et-product-v2
