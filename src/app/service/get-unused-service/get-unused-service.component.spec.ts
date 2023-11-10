import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUnusedServiceComponent } from './get-unused-service.component';

describe('GetUnusedServiceComponent', () => {
  let component: GetUnusedServiceComponent;
  let fixture: ComponentFixture<GetUnusedServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUnusedServiceComponent]
    });
    fixture = TestBed.createComponent(GetUnusedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
