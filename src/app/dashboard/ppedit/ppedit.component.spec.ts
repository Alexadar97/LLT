import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpeditComponent } from './ppedit.component';

describe('PpeditComponent', () => {
  let component: PpeditComponent;
  let fixture: ComponentFixture<PpeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
