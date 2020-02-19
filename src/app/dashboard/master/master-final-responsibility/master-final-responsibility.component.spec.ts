import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFinalResponsibilityComponent } from './master-final-responsibility.component';

describe('MasterFinalResponsibilityComponent', () => {
  let component: MasterFinalResponsibilityComponent;
  let fixture: ComponentFixture<MasterFinalResponsibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFinalResponsibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFinalResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
