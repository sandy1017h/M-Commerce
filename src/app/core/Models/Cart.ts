import { ProductResDto } from "./catalog";

export interface ShoppingCartItem {
    items: any;
    id: number;
    shoppingCartId: number;
    productId: number;
    product: ProductResDto;
    quantity: number;
    totalPrice: number;
    totalDiscount: number;
    totalPriceAfterDiscount: number;
    
}

export interface ShoppingCart {
    id: number;
    shoppingCartItems: any[];  
    totalItems: number;
    totalPrice: number;
    totalDiscount: number;
    totalPriceAfterDiscount: number;
    grandTotal: number;
    items: CartItem[]; // Ensure this is always an array, not optional
  }
    

export interface CartState {
    cart: ShoppingCart | null;
}


export interface CartItem {
    id: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    originalPrice: number;
  }
  
  

export interface Product {
    id: number;
    name: string;
    thumbnail: { url: string };
    originalPrice: number;
}