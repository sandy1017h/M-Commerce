import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../Models/Cart';
import { ResponseDto } from '../Models/response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getUserCart() {
    return this.http.get<ResponseDto<ShoppingCart>>('Cart/user/1');
  }
  addProductToCart(productId: number, quantity: number) {
    return this.http.post<ResponseDto<null>>('Cart/add', {
      userId: 1,
      productId,
      quantity
    });
  }
  updateCartItem(cartItemId: number, quantity: number) {
    return this.http.post<ResponseDto<null>>('CartItem', {
      userId: 1,
      cartItemId,
      quantity
    })
  }
  removeCartItem(cartItemId: number,) {
    return this.http.delete<ResponseDto<null>>('CartItem/1/'+cartItemId)
  }

  cartcount(userId: number) {
    return this.http.get('Cart/count/'+userId)
  }

  // getCart() {
  //   return this.http.get<ShoppingCart>(`api/cart`).pipe(
  //     tap(cart => console.log('Fetched cart:', cart))
  //   );
  // }
  
}
