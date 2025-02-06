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

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children: [
      {
        path: "",
        component: HomePageComponent
      },
      // {
      //   path: "home",
      //   component: HomePageComponent
      // },
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
      }
    ]
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
