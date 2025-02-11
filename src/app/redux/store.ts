import { Action, ActionReducer } from "@ngrx/store";
import { ActionReducerMap } from "@ngrx/store";
import { catalogReducer, CatalogState } from "./catalog/catalog.reducer";
import { wishlistReducer, WishListState } from "./wishlist/wishlist.reducer";
import { CatalogEffects } from "./catalog/catalog.effects";
import { WishlistEffects } from "./wishlist/wishlist.effect";
import { CartReducer, CartState } from "./cart/cart.reducer";
import { CartEffect } from "./cart/cart.effects";
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface AppState {
    catalog: CatalogState,
    wishlist:WishListState,
    cart:CartState
}


export interface AppStore {
    catalogStore: ActionReducer<CatalogState, Action>;
    wishListStore:ActionReducer<WishListState, Action>;
    cartStore:ActionReducer<CartState, Action>;
}
  
  export const appStore: AppStore = {
    catalogStore: catalogReducer,
    wishListStore:wishlistReducer,
    cartStore:CartReducer
  }


// Select the cart state
export const selectCartState = createFeatureSelector<CartState>('cart');

// Select specific properties from the cart state
export const selectCartProperty = createSelector(
    selectCartState,
    (state: CartState) => state // Adjust this based on what you need
);
export const appEffects = [CatalogEffects,WishlistEffects,CartEffect];