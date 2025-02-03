import { Component, Inject } from '@angular/core';
import { ShoppingCart } from '../core/Models/Cart';
import { Observable } from 'rxjs';
import { BASE_IMAGE_API } from '../core/token/baseUrl.token';
import { AppState } from '../redux/store';
import { Store } from '@ngrx/store';
import { selectCartProperty } from '../redux/cart/cart.selector';
import { loadCart } from '../redux/cart/cart.action';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart$:Observable<ShoppingCart|null>;

  constructor(
    @Inject(BASE_IMAGE_API) public imageUrl: string,
    private store:Store<AppState>
  ){
    this.cart$=this.store.select(selectCartProperty);
    //this.loading$ = this.store.select(selectWishlistLoading);
  }
  ngOnInit(): void {
    this.store.dispatch(loadCart());
  }
}
