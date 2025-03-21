import { Component, Inject, OnInit } from '@angular/core';
import { ShoppingCart } from '../core/Models/Cart';
import { Observable } from 'rxjs';
import { BASE_IMAGE_API } from '../core/token/baseUrl.token';
import { AppState } from '../redux/store';
import { Store } from '@ngrx/store';
import { selectCartProperty } from '../redux/cart/cart.selector';
import { loadCart } from '../redux/cart/cart.action';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../core/Services/address.service';
import { Address } from '../core/Models/Address';
import { CatalogService } from 'src/app/core/Services/catalog.service';
import { ProductResDto } from 'src/app/core/Models/catalog';

declare var $: any;
declare var WOW: any;
declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  cart$:Observable<ShoppingCart|null>;
  addresses: any[] = [];
  selectedAddressIndex: number | null = null;
  selectedAddress: any;
  user: any;
  UserId: number;
  amount: number = 0;
  product!:ProductResDto;

  currentUser: any = null; 
  http: any;

  

  constructor(
    @Inject(BASE_IMAGE_API) public imageUrl: string,  private router: Router,
    private store:Store<AppState>,private route: ActivatedRoute, 
    private authService: AuthService, private fb: FormBuilder,
    private addressService: AddressService,private catalogService:CatalogService
  ){
    this.cart$=this.store.select(selectCartProperty);
    const loginUser = JSON.parse(localStorage.getItem('currentUser')!);    
    // this.UserId = loginUser.userId;
    // this.UserId = loginUser ? loginUser.userId : null;
    this.UserId = this.currentUser ? this.currentUser.userId : null;

    //this.loading$ = this.store.select(selectWishlistLoading);
  }
  ngOnInit(): void {
    const user = this.authService.getLoggedInUser();
    if (user) {
      this.UserId = user.userId; // Ensure user object has an `id` property
      console.log("User ID in HeaderComponent:", this.UserId);
    }
    this.getCurrentUser();
    this.store.dispatch(loadCart());
    this.getUserAddresses();
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'] ? parseFloat(params['amount']) : 0;
    });
  }

  getCurrentUser() {
    // Simulate getting user data (Replace with actual API call)
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
    if (!this.currentUser || !this.currentUser.userId) {
      console.warn('No user data found');
    }
  }

  fetchUserById(id: number): void {
    this.authService.getUserById(id).subscribe(
      (userData) => {
        this.user = userData;
        console.log(this.user.data);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
  getUserAddresses(): void {
    this.addressService.getUserAddresses(this.UserId).subscribe({
      next: (data) => {
        this.addresses = data;
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

  selectAddress(index: number): void {
    this.selectedAddressIndex = index;
  }

  buyNow() {
    if (this.selectedAddressIndex === null) {
      alert('Please select an address before proceeding.');
      return;
    }
    this.payNow();

    const selectedAddress = this.addresses[this.selectedAddressIndex];
    const orderData = {
      userId :this.UserId,
      productId: this.product.id,
      productName: this.product.name,
      amount: this.product.newPrice,
      address: selectedAddress
    };


    // this.http.post('https://localhost:7174/api/Order/place', orderData).subscribe(
    //   (response: any) => {
    //     console.log('Order placed successfully', response);
    //     alert('Order placed successfully!');
    //     this.router.navigate(['/order-success']);
    //   },
    //   (error: any) => {
    //     console.error('Error placing order', error);
    //     alert('Failed to place order.');
    //   }
    // );
  } 
 
  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.amount,
      name: 'Ashok',
      key: 'rzp_test_Bei5VTuZ2Tb1qg', 
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
        this.router.navigate(['user-profile/'+this.UserId]);
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


  gotoaddaddress(){
    this.router.navigate(['user-profile/'+this.UserId]);
  }

  
}
