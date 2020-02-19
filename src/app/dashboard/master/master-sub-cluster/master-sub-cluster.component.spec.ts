import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSubClusterComponent } from './master-sub-cluster.component';

describe('MasterSubClusterComponent', () => {
  let component: MasterSubClusterComponent;
  let fixture: ComponentFixture<MasterSubClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSubClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSubClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
