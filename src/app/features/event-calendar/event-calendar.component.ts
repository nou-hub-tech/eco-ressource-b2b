import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../core/services/event';
import { PlatformEventDto } from '../../core/services/admin-api.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core'; // ← import EventInput


@Component({
  selector: 'app-event-calendar',
  standalone: true, 
  imports: [
    CommonModule,       
    FullCalendarModule 
  ],
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})


export class EventCalendarComponent implements OnInit {
  platformEvents: PlatformEventDto[] = [];
  selectedEvent: PlatformEventDto | null = null;

    //calendarEvents: EventInput[] = [];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    height: 'auto'
  };

  constructor(private readonly eventService: EventService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
      console.log('>>> loadEvents called'); 

    this.eventService.getPlatformEvents().subscribe({
      next: (events) => {      
        console.log('>>> events received:', events.length);

        this.platformEvents = events;

       const mapped: EventInput[] = events.map((event) => ({
          id: event.id.toString(),
          title: event.title,
          start: event.eventDate,  
          color: this.getEventColor(event.status),
          extendedProps: {
            location: event.location,
            participants: event.participants,
            status: event.status,
            typeLabel: event.typeLabel,
            createdAt: event.createdAt
          }
        }));
         this.calendarOptions = {
          ...this.calendarOptions,
          events: mapped
        };
       console.log('>>> calendarOptions.events set:', mapped.length);
       
      this.cdr.detectChanges(); 

      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const eventId = Number(clickInfo.event.id);
    this.selectedEvent =
      this.platformEvents.find((event) => event.id === eventId) || null;
  }

  getEventColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'upcoming':
        return '#3788d8';
      case 'ongoing':
        return '#f39c12';
      case 'completed':
        return '#27ae60';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  }
}