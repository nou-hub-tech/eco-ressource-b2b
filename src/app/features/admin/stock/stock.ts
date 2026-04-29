import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  standalone: false,
  templateUrl: './stock.html',
  styleUrls: ['./stock.css']
})
export class Stock implements OnInit {
  search = '';
  showModal = false;
  items: any[] = [];

  get filtered(): any[] {
    return this.items.filter(i =>
      (i.name || '').toLowerCase().includes(this.search.toLowerCase())
    );
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    void this.router.navigate(['/admin/stockitems']);
  }

  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
}