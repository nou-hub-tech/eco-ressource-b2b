import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Events } from './events';
import { AuthService } from '../../core/services/auth';
import { EventService } from '../../core/services/event';
import { EventParticipationService } from '../../core/services/event-participation.service';

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

    const authMock: Partial<AuthService> = {
      currentUser: {
        id: '1',
        name: 'Test',
        email: 't@test',
        role: 'admin',
        avatar: ''
      }
    };

    const participationMock: Partial<EventParticipationService> = {
      list: () => of([])
    };

    await TestBed.configureTestingModule({
      declarations: [Events],
      imports: [FormsModule],
      providers: [
        { provide: EventService, useValue: eventServiceMock as EventService },
        { provide: AuthService, useValue: authMock as AuthService },
        {
          provide: EventParticipationService,
          useValue: participationMock as EventParticipationService
        }
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
