import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrestComponent } from './newrest.component';

describe('NewrestComponent', () => {
  let component: NewrestComponent;
  let fixture: ComponentFixture<NewrestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewrestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
