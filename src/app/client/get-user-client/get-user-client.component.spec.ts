import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserClientComponent } from './get-user-client.component';

describe('GetUserClientComponent', () => {
  let component: GetUserClientComponent;
  let fixture: ComponentFixture<GetUserClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUserClientComponent]
    });
    fixture = TestBed.createComponent(GetUserClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
