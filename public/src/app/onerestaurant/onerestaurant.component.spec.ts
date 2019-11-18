import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnerestaurantComponent } from './onerestaurant.component';

describe('OnerestaurantComponent', () => {
  let component: OnerestaurantComponent;
  let fixture: ComponentFixture<OnerestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnerestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnerestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
