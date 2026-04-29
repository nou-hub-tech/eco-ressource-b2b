import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { EventService } from './event';
import { AdminApiService } from './admin-api.service';
import { environment } from '../../../environments/environment';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminApiService, EventService]
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPlatformEvents should GET /platform-events', () => {
    service.getPlatformEvents().subscribe(events => {
      expect(events.length).toBe(0);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/platform-events`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('createPlatformEvent should POST body', () => {
    const body = {
      title: 'T',
      eventDate: '2026-04-12',
      location: 'Tunis',
      participants: 10,
      status: 'UPCOMING',
      typeLabel: 'Conference'
    };
    service.createPlatformEvent(body).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/platform-events`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({ id: 1, ...body, createdAt: '2026-04-12T10:00:00' });
  });
});
