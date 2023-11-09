import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserServiceComponent } from './get-user-service.component';

describe('GetAllServiceComponent', () => {
  let component: GetUserServiceComponent;
  let fixture: ComponentFixture<GetUserServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUserServiceComponent]
    });
    fixture = TestBed.createComponent(GetUserServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
