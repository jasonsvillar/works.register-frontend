import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllServiceSystemComponent } from './get-all-service-system.component';

describe('GetAllServiceSystemComponent', () => {
  let component: GetAllServiceSystemComponent;
  let fixture: ComponentFixture<GetAllServiceSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllServiceSystemComponent]
    });
    fixture = TestBed.createComponent(GetAllServiceSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
