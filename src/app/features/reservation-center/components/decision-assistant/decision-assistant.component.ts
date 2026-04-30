import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { BackendReservation } from '../../../../pages/moduleReservation/shared/api/reservation-api.service';
import { BackendReservationSlot } from '../../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import { ReservationCenterService } from '../../services/reservation-center.service';

type AssistantDecision = 'Accept' | 'Reject';

@Component({
  selector: 'app-decision-assistant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decision-assistant.component.html',
  styleUrls: ['./decision-assistant.component.css'],
})
export class DecisionAssistantComponent implements OnChanges {
  @Input({ required: true }) reservation!: BackendReservation;
  @Input() reservations: BackendReservation[] = [];
  @Input() slots: BackendReservationSlot[] = [];

  decision: AssistantDecision = 'Accept';
  explanation = 'Low conflict and optimal slot usage.';

  constructor(private readonly workspace: ReservationCenterService) {}

  ngOnChanges(): void {
    if (!this.reservation) {
      return;
    }

    const slot = this.slots.find(item => item.id === this.reservation.slotId);
    const conflict = this.workspace.detectReservationConflict(this.reservation, this.reservations, this.slots);
    const slotWindow = slot ? Math.max(1, slot.endHour - slot.startHour) : 0;

    if (this.reservation.status === 'CONFIRMED') {
      this.decision = 'Accept';
      this.explanation = 'Already confirmed on the backend.';
      return;
    }

    if (this.reservation.status === 'CANCELLED') {
      this.decision = 'Reject';
      this.explanation = 'Already rejected or cancelled on the backend.';
      return;
    }

    if (!slot) {
      this.decision = 'Reject';
      this.explanation = 'Linked slot is unavailable.';
      return;
    }

    if (slot.status === 'blocked') {
      this.decision = 'Reject';
      this.explanation = 'Slot is blocked and cannot accept new usage.';
      return;
    }

    if (slot.status === 'booked') {
      this.decision = 'Reject';
      this.explanation = 'Slot is already booked.';
      return;
    }

    if (conflict.hasConflict) {
      this.decision = 'Reject';
      this.explanation = `${conflict.blockingReservations.length} overlapping request(s) detected.`;
      return;
    }

    if (this.reservation.hours > slotWindow) {
      this.decision = 'Reject';
      this.explanation = 'Requested duration exceeds the slot availability window.';
      return;
    }

    this.decision = 'Accept';
    this.explanation = 'Low conflict and optimal slot usage.';
  }
}
