import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Events } from './events';
import { EventService } from '../../../core/services/event';

describe('Events', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;

  beforeEach(async () => {
    const eventServiceMock: Partial<EventService> = {
      getPlatformEvents: () => of([]),
      getPlatformEvent: () =>
        of({
          id: 1,
          title: '',
          eventDate: '',
          location: '',
          participants: 0,
          status: 'UPCOMING',
          typeLabel: '',
          createdAt: ''
        }),
      createPlatformEvent: () =>
        of({
          id: 1,
          title: '',
          eventDate: '',
          location: '',
          participants: 0,
          status: 'UPCOMING',
          typeLabel: '',
          createdAt: ''
        }),
      updatePlatformEvent: () =>
        of({
          id: 1,
          title: '',
          eventDate: '',
          location: '',
          participants: 0,
          status: 'UPCOMING',
          typeLabel: '',
          createdAt: ''
        }),
      deletePlatformEvent: () => of(undefined)
    };

    await TestBed.configureTestingModule({
      declarations: [Events],
      imports: [FormsModule],
      providers: [
        { provide: EventService, useValue: eventServiceMock as EventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Events);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
