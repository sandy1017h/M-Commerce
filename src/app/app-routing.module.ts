import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { authGuard } from './core/gaurds/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BusinessaccountComponent } from './auth/businessaccount/businessaccount.component';
import { SellerPaymentComponent } from './auth/seller-payment/seller-payment.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { BusinessAccDashboardComponent } from './business-acc-dashboard/business-acc-dashboard/business-acc-dashboard.component';
import { MyproductsComponent } from './products/myproducts/myproducts.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children: [
      {
        path: "",
        component: LoginComponent
      },
      {
        path: "home",
        component: HomePageComponent,
        pathMatch:'full'
      },
      
      {
        path:"products",
        loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)
      },
      {
        path:"wishlist",
        component:WishlistComponent,
        canActivate:[authGuard]
      },
      {
        path:"cart",
        component:CartComponent,
        canActivate:[authGuard]
      },
      {
        path:"checkout",
        component:CheckoutComponent,
        canActivate:[authGuard]
      },
      {
        path:'login',
        component:LoginComponent,
        pathMatch:'full'
      },
      {
        path:'register',
        component:RegisterComponent,
        pathMatch:'full'
      },
      {
        path:"user-profile/:id",
        component:UserDetailsComponent,
      },
      {
        path:'Business',
        component:BusinessaccountComponent,
        pathMatch:'full'
      },
     
      {
        path:'addproducts',
        component:AddProductComponent,
        pathMatch:'full'
      },
      {
        path:'sellpayment',
        component:SellerPaymentComponent,
        pathMatch:'full'
      },
      {
        path:'Myproductsdata',
        component:MyproductsComponent,
        pathMatch:'full'
      },
    ]
  },
  {
    path: "busaccdashboard",
    component: BusinessAccDashboardComponent,
    pathMatch: 'full'
  },
  {
    path:"**",
    component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
