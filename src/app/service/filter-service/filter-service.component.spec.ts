import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterServiceComponent } from './filter-service.component';

describe('FilterServiceComponent', () => {
  let component: FilterServiceComponent;
  let fixture: ComponentFixture<FilterServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterServiceComponent]
    });
    fixture = TestBed.createComponent(FilterServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
