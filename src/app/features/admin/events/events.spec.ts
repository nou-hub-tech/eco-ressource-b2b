import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { Events } from './events';

describe('Events', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Events]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Events);
=======
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
>>>>>>> origin/integration/gestion-annonce-et-product-v2
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
