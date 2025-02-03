import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";

export const selectCarttState = createFeatureSelector<CartState>('cartStore');


export const selectCartProperty = createSelector(
    selectCarttState,
    (state: CartState) => state.cart
);