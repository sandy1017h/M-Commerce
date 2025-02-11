import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPaymentComponent } from './seller-payment.component';

describe('SellerPaymentComponent', () => {
  let component: SellerPaymentComponent;
  let fixture: ComponentFixture<SellerPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
