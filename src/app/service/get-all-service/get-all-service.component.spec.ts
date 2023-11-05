import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllServiceComponent } from './get-all-service.component';

describe('GetAllServiceComponent', () => {
  let component: GetAllServiceComponent;
  let fixture: ComponentFixture<GetAllServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllServiceComponent]
    });
    fixture = TestBed.createComponent(GetAllServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
