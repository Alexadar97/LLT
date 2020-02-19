import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsDashboardComponent } from './logistics-dashboard.component';

describe('LogisticsDashboardComponent', () => {
  let component: LogisticsDashboardComponent;
  let fixture: ComponentFixture<LogisticsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
