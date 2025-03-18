import { Component, Inject, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/core/Models/Cart';
import { Observable } from 'rxjs';
import { BASE_IMAGE_API } from 'src/app/core/token/baseUrl.token';
import { AppState } from 'src/app/redux/store';
import { Store } from '@ngrx/store';
import { selectCartProperty } from 'src/app/redux/cart/cart.selector';
import { loadCart } from 'src/app/redux/cart/cart.action';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/core/Services/address.service';
import { Address } from 'src/app/core/Models/Address';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CatalogService } from 'src/app/core/Services/catalog.service';
import { ProductResDto } from 'src/app/core/Models/catalog';
import { Router } from '@angular/router';


declare var $: any;
declare var WOW: any;
declare var Razorpay: any;

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit{
  cart$:Observable<ShoppingCart|null>;
  addresses: any[] = [];
  selectedAddressIndex: number | null = null;
  selectedAddress: any;
  user: any;
  UserId: number;
  amount: number = 0;
  product!:ProductResDto;
  quantity:number=1;

  currentUser: any = null; 
  http: any;

  constructor(
    @Inject(BASE_IMAGE_API) public imageUrl: string,
    private store:Store<AppState>,private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder,
        private addressService: AddressService,private catalogService:CatalogService,private router: Router
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
    // this.store.dispatch(loadCart());
    this.getUserAddresses();
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'] ? parseFloat(params['amount']) : 0;
    });
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.catalogService.getProductById(id).subscribe(res=>{
        if(res.data) this.product=res.data;
      })
    }
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

  proceedToPayment() {
    alert('Redirecting to Payment Gateway...');
    // Implement Razorpay or any payment integration here
  }

  buyNow() {
    if (this.selectedAddressIndex === null) {
      alert('Please select an address before proceeding.');
      return;
    }

    const selectedAddress = this.addresses[this.selectedAddressIndex];
    const orderData = {
      userId :this.UserId,
      productId: this.product.id,
      productName: this.product.name,
      amount: this.product.newPrice,
      address: selectedAddress
    };
    this.router.navigate(['/products']);
    this.payNow();
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
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      },
      handler: (response: any) => {
        console.log('Payment Successful:', response);
        alert('Payment Successful!');
        this.router.navigate(['/products']);
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
    this.router.navigate(['/products']);
  } 


  
}
