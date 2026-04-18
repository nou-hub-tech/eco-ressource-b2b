import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventCalendarComponent } from './features/event-calendar/event-calendar.component';


@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AppRoutingModule,
    EventCalendarComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: 
      JwtInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule {}