import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from 'src/app/core/Services/cart.service';
import { AddToCart, loadCart, loadCartFailure, loadCartSuccess, RemoveCartItem, UpdateCartItem } from './cart.action';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class CartEffect {
    constructor(
        private actions$: Actions,
        private cartService: CartService
    ) { }


    loadCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCart),
            mergeMap(() =>
                this.cartService.getUserCart().pipe(
                    map((res) => {
                        return res.isSuccessed ? loadCartSuccess({ cart: res.data }) : loadCartFailure({ error: res.message })
                    }),
                    catchError((error) => of(loadCartFailure({ error })))
                )
            )
        )
    );

    addToCart$=createEffect(() =>
        this.actions$.pipe(
            ofType(AddToCart),
            mergeMap(({productId,quantity}) =>
                this.cartService.addProductToCart(productId,quantity).pipe(
                    switchMap((res) => {
                        return of(res.isSuccessed ? loadCart() : loadCartFailure({ error: res.message }))
                    }),
                    catchError((error) => of(loadCartFailure({ error })))
                )
            )
        )
    );

    updateCartItem$=createEffect(() =>
        this.actions$.pipe(
            ofType(UpdateCartItem),
            mergeMap(({cartItemId,quantity}) =>
                this.cartService.updateCartItem(cartItemId,quantity).pipe(
                    switchMap((res) => {
                        return of(res.isSuccessed ? loadCart() : loadCartFailure({ error: res.message }))
                    }),
                    catchError((error) => of(loadCartFailure({ error })))
                )
            )
        )
    );

    removeCartItem$=createEffect(() =>
        this.actions$.pipe(
            ofType(RemoveCartItem),
            mergeMap(({cartItemId}) =>
                this.cartService.removeCartItem(cartItemId).pipe(
                    switchMap((res) => {
                        return of(res.isSuccessed ? loadCart() : loadCartFailure({ error: res.message }))
                    }),
                    catchError((error) => of(loadCartFailure({ error })))
                )
            )
        )
    );
}