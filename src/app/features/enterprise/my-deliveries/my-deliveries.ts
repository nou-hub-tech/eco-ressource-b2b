import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-my-deliveries', standalone: false, templateUrl: './my-deliveries.html', styleUrls: ['./my-deliveries.css'] })
export class MyDeliveries implements OnInit {
  deliveries = [
    { id:'DEL-1042', product:'Aluminum Scrap 2T',    from:'Tunis', to:'Sfax',    transporter:'Karim Transport', status:'delivered',  co2:'12kg', date:'Mar 10', amount:1200 },
    { id:'DEL-1043', product:'Cardboard Bales 1T',   from:'Sousse',to:'Tunis',   transporter:'Sana Transport',  status:'in-transit', co2:'18kg', date:'Mar 14', amount:180  },
    { id:'DEL-1044', product:'Steel Offcuts 800kg',  from:'Sfax',  to:'Bizerte', transporter:'Karim Transport', status:'pending',    co2:'9kg',  date:'Mar 15', amount:620  },
  ];
  ngOnInit(): void {}
}