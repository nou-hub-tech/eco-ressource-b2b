import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AiSuggestionsService, Machine } from '../../shared/ai-suggestions.service';

@Component({
  selector: 'app-slot-calendar-simple',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="eco-page rise">
      <header class="eco-page-head">
        <div>
          <div class="section-label"><span class="ai-dot"></span> Slot planner</div>
          <h1>Reserve a slot</h1>
          <p class="sub">Pick machine + time window, then we prefill the reservation wizard.</p>
        </div>
        <a routerLink="/enterprise/slot-management" class="btn ghost">Slot inventory</a>
      </header>

      <div class="card">
        <div class="row">
          <label class="field-label">Machine</label>
          <select class="input" [(ngModel)]="machineName">
            <option *ngFor="let m of machines" [value]="m.name">{{ m.name }}</option>
          </select>
        </div>

        <div class="row">
          <label class="field-label">Your company</label>
          <input class="input" [(ngModel)]="company" placeholder="e.g. EcoPlast" />
        </div>

        <div class="row">
          <label class="field-label">Date</label>
          <input class="input" type="date" [(ngModel)]="date" />
        </div>

        <div class="row">
          <label class="field-label">Start hour</label>
          <input class="input" type="number" min="0" max="23" [(ngModel)]="startHour" />
        </div>

        <div class="row">
          <label class="field-label">Duration (hours)</label>
          <input class="input" type="number" min="1" max="8" [(ngModel)]="hours" />
        </div>

        <div class="muted" *ngIf="machineName">
          Window: {{ startHour }}:00 → {{ endHour }}:00
        </div>

        <div class="actions">
          <button class="btn primary" (click)="reserve()">Reserve this slot →</button>
        </div>
      </div>
    </div>
  `,
})
export class SlotCalendarSimple implements OnInit {
  machines: Machine[] = [];

  machineName = '';
  company = '';
  date = '';
  startHour = 9;
  hours = 4;

  constructor(
    public readonly ai: AiSuggestionsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.machines = this.ai.machines;
    this.machineName = this.machines[0]?.name ?? '';

    const d = new Date();
    d.setDate(d.getDate() + 1);
    this.date = d.toISOString().slice(0, 10);
  }

  get endHour(): number {
    return (this.startHour + this.hours) % 24;
  }

  reserve(): void {
    this.router.navigate(['/enterprise/new-reservation'], {
      queryParams: {
        company: this.company,
        machine: this.machineName,
        date: this.date,
        startHour: String(this.startHour),
        hours: String(this.hours),
        solar: String(false),
      },
    });
  }
}

