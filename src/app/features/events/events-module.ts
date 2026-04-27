import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Events } from './events';
import { EventsMapComponent } from './events-map/events-map';

@NgModule({
  declarations: [Events, EventsMapComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [Events, EventsMapComponent]
})
export class FeaturesEventsModule {}
