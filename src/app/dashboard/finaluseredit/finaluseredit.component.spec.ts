import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalusereditComponent } from './finaluseredit.component';

describe('FinalusereditComponent', () => {
  let component: FinalusereditComponent;
  let fixture: ComponentFixture<FinalusereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalusereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalusereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
