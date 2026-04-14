import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Events } from './events';

@NgModule({
  declarations: [Events],
  imports: [CommonModule, FormsModule],
  exports: [Events]
})
export class FeaturesEventsModule {}
