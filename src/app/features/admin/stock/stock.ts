import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  standalone: false,
  templateUrl: './stock.html',
  styleUrls: ['./stock.css']
})
export class Stock implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    void this.router.navigate(['/admin/stockitems']);
  }
}