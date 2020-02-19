import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingErrorLogListComponent } from './pending-error-log-list.component';

describe('PendingErrorLogListComponent', () => {
  let component: PendingErrorLogListComponent;
  let fixture: ComponentFixture<PendingErrorLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingErrorLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingErrorLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
