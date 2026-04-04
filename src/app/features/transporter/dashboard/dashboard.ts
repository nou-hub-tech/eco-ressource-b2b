import { Component, OnInit } from '@angular/core';
import { TransportService, DeliveryDto } from '../../../core/services/transport.service';

@Component({ selector: 'app-dashboard', standalone: false, templateUrl: './dashboard.html', styleUrls: ['./dashboard.css'] })
export class Dashboard implements OnInit {
  stats = [
    { label:'Total Trips',       value:'0',    change:'+0 this month', up:true,  icon:'🗺',  bg:'rgba(245,158,11,.1)' },
    { label:'Active Shipments',  value:'0',     change:'On schedule',   up:true,  icon:'📦',  bg:'rgba(52,211,153,.08)' },
    { label:'km Driven',         value:'0',    change:'+0 this week',up:true,  icon:'📏',  bg:'rgba(96,165,250,.08)' },
    { label:'CO₂ Saved',         value:'0kg',  change:'Via pooling',   up:true,  icon:'🌿',  bg:'rgba(52,211,153,.08)' },
  ];
  trips: DeliveryDto[] = [];

  constructor(
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.transportService.getTransporterDeliveries().subscribe(deliveries => {
      this.trips = deliveries;
      
      // Update stats
      this.stats[0].value = deliveries.length.toString();
      this.stats[0].change = `+${Math.floor(Math.random() * 10)} this month`;
      
      const activeShipments = deliveries.filter(d => d.status === 'in-transit' || d.status === 'pickup').length;
      this.stats[1].value = activeShipments.toString();
      
      // Mock calculations for km driven and CO2 saved
      const totalKm = deliveries.reduce((sum, d) => sum + 120, 0); // Mock 120km per delivery
      this.stats[2].value = totalKm.toString();
      this.stats[2].change = `+${Math.floor(Math.random() * 400)} this week`;
      
      const co2Saved = Math.floor(totalKm * 0.02); // Mock 0.02kg CO2 per km
      this.stats[3].value = `${co2Saved}kg`;
    });
  }
}