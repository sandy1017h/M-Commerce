import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAccDashboardComponent } from './business-acc-dashboard.component';

describe('BusinessAccDashboardComponent', () => {
  let component: BusinessAccDashboardComponent;
  let fixture: ComponentFixture<BusinessAccDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAccDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAccDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
