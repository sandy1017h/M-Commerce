// filepath: /path/to/app.module.ts
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './layout/layout.module';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from './shared/shared.module';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { BASE_API, BASE_IMAGE_API } from './core/token/baseUrl.token';
import { environment } from 'src/environments/environment';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { AuthIntercetorInterceptor } from './core/interceptor/auth-intercetor.interceptor';
import { appInitializer } from './core/helper/app.initializer';
import { AuthService } from './core/Services/auth.service';
import { appEffects, appStore } from './redux/store';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthModule } from './auth/auth.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { BusinessAccDashboardRoutingModule } from './business-acc-dashboard/business-acc-dashboard-routing.module';
import { BusinessAccDashboardModule } from './business-acc-dashboard/business-acc-dashboard.module';
import { OrdersComponent } from './orders/orders.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatCardModule } from '@angular/material/card';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckoutComponent,
    UserDetailsComponent,
    OrdersComponent,
    HomePageComponent   
  ],
  imports: [
    BusinessAccDashboardModule,
    ReactiveFormsModule,
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appStore),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, trace: true }),
    SharedModule,
    CarouselModule,
    ButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ProductsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accestoken'),
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: BASE_API,
      useValue: environment.baseApi
    },
    {
      provide: BASE_IMAGE_API,
      useValue: environment.imageBaseApi
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercetorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }