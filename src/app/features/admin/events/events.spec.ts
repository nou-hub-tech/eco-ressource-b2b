import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEvents } from './events';

describe('AdminEvents', () => {
  let component: AdminEvents;
  let fixture: ComponentFixture<AdminEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
