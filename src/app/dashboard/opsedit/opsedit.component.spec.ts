import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpseditComponent } from './opsedit.component';

describe('OpseditComponent', () => {
  let component: OpseditComponent;
  let fixture: ComponentFixture<OpseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
