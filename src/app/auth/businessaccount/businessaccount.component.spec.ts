import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessaccountComponent } from './businessaccount.component';

describe('BusinessaccountComponent', () => {
  let component: BusinessaccountComponent;
  let fixture: ComponentFixture<BusinessaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessaccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
