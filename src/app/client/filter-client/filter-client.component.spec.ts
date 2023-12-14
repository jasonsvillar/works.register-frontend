import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClientComponent } from './filter-client.component';

describe('FilterClientComponent', () => {
  let component: FilterClientComponent;
  let fixture: ComponentFixture<FilterClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterClientComponent]
    });
    fixture = TestBed.createComponent(FilterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
