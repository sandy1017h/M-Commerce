import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MatTooltip, matTooltipAnimations, MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from 'src/app/core/Services/auth.service';
import { ResponseDto } from 'src/app/core/Models/response';
import { AlertService } from 'src/app/core/Services/alert.service';

declare var $: any;
declare var WOW: any;
declare var Razorpay: any;

@Component({
  selector: 'app-businessaccount',
  templateUrl: './businessaccount.component.html',
  styleUrls: ['./businessaccount.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatTooltipModule
  ]
})
export class BusinessaccountComponent {

  businessForm: FormGroup;
  contactForm: FormGroup;
  paymentForm: FormGroup;

  amount: number = 0;


  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  years: string[] = [
    '2025', '2026', '2027', '2028', '2029', '2030'  // Add more years as needed
  ];

  constructor(private fb: FormBuilder,private authService:AuthService, private router:Router,private alertService:AlertService) {
    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      businessType: ['', Validators.required],
      gstNumber: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      userName: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required], // Add this field
      expiryMonth: ['', Validators.required], // Add this field
      expiryYear: ['', Validators.required], // Add this field
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]], // Add this field
      cardName: ['', Validators.required], // Add this field
      upiId: ['']
    });
    
  }

  onPaymentMethodChange(event: any) {
    const method = event.value;
    if (method === 'creditcard') {
      // Enable Credit Card fields and disable UPI fields
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required]);
      this.paymentForm.get('expiryMonth')?.setValidators([Validators.required]);
      this.paymentForm.get('expiryYear')?.setValidators([Validators.required]);
      this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
      this.paymentForm.get('cardName')?.setValidators([Validators.required]);

      this.paymentForm.get('upiId')?.clearValidators();
    } else if (method === 'upi') {
      // Enable UPI fields and disable Credit Card fields
      this.paymentForm.get('cardNumber')?.clearValidators();
      this.paymentForm.get('expiryMonth')?.clearValidators();
      this.paymentForm.get('expiryYear')?.clearValidators();
      this.paymentForm.get('cvv')?.clearValidators();
      this.paymentForm.get('cardName')?.clearValidators();

      this.paymentForm.get('upiId')?.setValidators([Validators.required]);
    }
    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expiryMonth')?.updateValueAndValidity();
    this.paymentForm.get('expiryYear')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
    this.paymentForm.get('cardName')?.updateValueAndValidity();
    this.paymentForm.get('upiId')?.updateValueAndValidity();
  }



  redirectToPayment(method: 'googlepay' | 'phonepe' | 'paytm' | 'razorpay') {
    const paymentLinks = {
      googlepay: 'https://pay.google.com/',
      phonepe: 'https://www.phonepe.com/',
      paytm: 'https://paytm.com/',
      razorpay: 'https://razorpay.com/'
    };

    if (paymentLinks[method]) {
      window.open(paymentLinks[method], '_blank');
    }
  }
  onSubmit() {
    if (this.businessForm.valid && this.contactForm.valid) {
      const businessAccountData = {
        businessName: this.businessForm.get('businessName')?.value,
        businessType: this.businessForm.get('businessType')?.value,
        gstNumber: this.businessForm.get('gstNumber')?.value,
        email: this.contactForm.get('email')?.value,
        PhoneNumber: this.contactForm.get('PhoneNumber')?.value,
        password: this.contactForm.get('password')?.value,
        address: this.contactForm.get('address')?.value,
        userName: this.contactForm.get('userName')?.value
      };
  
      this.authService.RegisterBusinessacc(businessAccountData)
        .subscribe({
          next: (res: ResponseDto<null>) => {
            if (res.isSuccessed) {
              this.alertService.default('Successfully created the Business account');
              this.router.navigateByUrl('/login');
            } else {
              alert(res.message);
            }
          },
          error: (err) => {
            console.error('Registration failed:', err);
            this.alertService.default('Registration failed. Please try again later.');
          }
        });
    } else {
      this.businessForm.markAllAsTouched();
      this.contactForm.markAllAsTouched();
    }
  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.amount,
      name: 'Ashok',
      key: 'rzp_test_FjzUpnjxof6pQr', 
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      // prefill: {
      //   name: this.form.value.Name,
      //   email: this.form.value.Email,
      //   contact: this.form.value.Phone,
      // },
      theme: {
        color: '#6466e3'
      },
      handler: (response: any) => {
        console.log('Payment Successful:', response);
        alert('Payment Successful!');
        this.router.navigate(['/login']);
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }
    const successCallback = (paymentId: any) => {
      console.log(paymentId);
      // this.fetchPaymentDetails(paymentId);
    }
 
    const failureCallback = (e: any) => {
      console.log(e);
    }
 
    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  }
  
}
