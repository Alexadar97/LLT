import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclusterDashboardComponent } from './subcluster-dashboard.component';

describe('SubclusterDashboardComponent', () => {
  let component: SubclusterDashboardComponent;
  let fixture: ComponentFixture<SubclusterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclusterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclusterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
