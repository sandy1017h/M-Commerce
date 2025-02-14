import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent
  }, {
    path: "product/:id",
    component: ProductDetailComponent
  },{
    path: "cart",
    component: CartComponent
  },
  {
    path: "checkout/:id",
    component: ProductCheckoutComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
