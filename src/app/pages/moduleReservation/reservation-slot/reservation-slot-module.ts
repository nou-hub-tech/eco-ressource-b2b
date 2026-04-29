import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationSlotRoutingModule } from './reservation-slot-routing-module';

/**
 * NOTE: SlotCalendar, SlotForm, and SlotList are all standalone
 * components — they're loaded via lazy `loadComponent` in the
 * EnterpriseRoutingModule, not declared here.
 */
@NgModule({
  imports: [CommonModule, ReservationSlotRoutingModule],
})
export class ReservationSlotModule {}
