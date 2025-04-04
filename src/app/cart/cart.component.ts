import { Component, Inject, OnInit } from '@angular/core';
import { BASE_IMAGE_API } from '../core/token/baseUrl.token';
import { AppState } from '../redux/store';
import { Store } from '@ngrx/store';
import { selectCartProperty } from '../redux/cart/cart.selector';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../core/Models/Cart';
import { loadCart, RemoveCartItem, UpdateCartItem } from '../redux/cart/cart.action';
import { SharedModule } from '../shared/shared.module';
import AOS from 'aos';
import { CartService } from '../core/Services/cart.service';


@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [SharedModule]
})
export class CartComponent implements OnInit {
  cart$: Observable<ShoppingCart | null>;

  items: any;

  constructor(private http: CartService,
    @Inject(BASE_IMAGE_API) public imageUrl: string,
    private store: Store<AppState>) {
      this.cart$ = this.store.select(selectCartProperty); 
    //this.loading$ = this.store.select(selectWishlistLoading);
  }
  ngOnInit(): void {
    this.store.dispatch(loadCart());
    this.Getusercarts();
    AOS.init({
      duration: 2000,
      once: false,
      delay: 200,
      mirror: true,
    });

    this.cart$.subscribe(cart => console.log('Cart data:', cart?.items));
    this.store.dispatch(loadCart());

  }

  Getusercarts() {
    this.http.getUserCart().subscribe(res => {
      if (res && res['items'] && Array.isArray(res['items'])) {
        this.items = res['items'];
        console.log("Cart Data Received:", this.items);

        this.items.forEach((item: { productName: any; }) => {
          console.log("Product Name:", item?.productName || "No Product Name");
        });
      } else {
        console.error("Error: Unexpected cart data format", res);
        this.items = []; // Ensure items is always an array
      }
    });
  }


  updateCartItem(cartItemId:number,quantity:number){
    this.store.dispatch(UpdateCartItem({cartItemId,quantity}))
 }

 removeCartItem(cartItemId:number){
   this.store.dispatch(RemoveCartItem({cartItemId}))
 }


}
