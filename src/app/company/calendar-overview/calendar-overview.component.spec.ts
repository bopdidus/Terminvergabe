import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOverviewComponent } from './calendar-overview.component';

describe('CalendarOverviewComponent', () => {
  let component: CalendarOverviewComponent;
  let fixture: ComponentFixture<CalendarOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
