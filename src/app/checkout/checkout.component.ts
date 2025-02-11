import { Component, Inject, OnInit } from '@angular/core';
import { ShoppingCart } from '../core/Models/Cart';
import { Observable } from 'rxjs';
import { BASE_IMAGE_API } from '../core/token/baseUrl.token';
import { AppState } from '../redux/store';
import { Store } from '@ngrx/store';
import { selectCartProperty } from '../redux/cart/cart.selector';
import { loadCart } from '../redux/cart/cart.action';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../core/Services/address.service';
import { Address } from '../core/Models/Address';

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
  currentUser: any = null; 

  constructor(
    @Inject(BASE_IMAGE_API) public imageUrl: string,
    private store:Store<AppState>,private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder,
        private addressService: AddressService
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

  
}
