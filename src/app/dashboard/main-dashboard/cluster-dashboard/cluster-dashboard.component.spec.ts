import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDashboardComponent } from './cluster-dashboard.component';

describe('ClusterDashboardComponent', () => {
  let component: ClusterDashboardComponent;
  let fixture: ComponentFixture<ClusterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
