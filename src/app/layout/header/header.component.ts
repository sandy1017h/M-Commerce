import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CategoryResDto } from 'src/app/core/Models/catalog';
import { AuthService } from 'src/app/core/Services/auth.service';
import { selectCategories } from 'src/app/redux/catalog/catalog.selector';
import { AppState } from 'src/app/redux/store';
import { CartReducer } from 'src/app/redux/cart/cart.reducer';
import { selectCartProperty } from 'src/app/redux/cart/cart.selector';
import { AlertService } from 'src/app/core/Services/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from 'src/app/core/Services/cart.service';
import { loadCart } from 'src/app/redux/cart/cart.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;
  categories$: Observable<CategoryResDto[]>;
  user: any;
  UserId: number | null = null;
  currentUser: any = null;   
  cartItemCount: number = 0;
  isAdmin: boolean = false;
  cartItemCount$: Observable<number> = new Observable<number>();
  productId: number = 0;

  constructor(private store: Store<AppState>, public auth: AuthService,
    private alertService: AlertService,private router:Router,private http: CartService) {
    this.categories$ = this.store.select(selectCategories);
    const loginUser = JSON.parse(localStorage.getItem('currentUser')!);    
    // this.UserId = loginUser.userId;
    // this.UserId = loginUser ? loginUser.userId : null;
    this.UserId = this.currentUser ? this.currentUser.userId : null;


  }

  placeholders = [
    "Search for Grocery Brands and more...",
    "Search for Mobiles Brands and more...",
    "Search for Fashion Brands and more...",
    "Search for Home and Furniture Brands and more...",
    "Search for Electronics Brands and more...",
    "Search for Healthcare Items Brands and more..."
  ];

  placeholderStyles = [
    { color: '#1d4828', fontSize: '1rem', fontWeight: '400' }, 
    { color: '#ff6347', fontSize: '1rem', fontWeight: '400' }, 
    { color: '#6a5acd', fontSize: '1rem', fontWeight: '400' }, 
    { color: '#ffa500', fontSize: '1rem', fontWeight: '400' },
    { color: '#4682b4', fontSize: '1rem', fontWeight: '400' }, 
    { color: '#32cd32', fontSize: '1rem', fontWeight: '400' }
  ];

  ngOnInit() {
    let index = 0;
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;

    const updatePlaceholder = () => {
      searchInput.placeholder = this.placeholders[index];

      
      const placeholderStyle = document.createElement('style');
      placeholderStyle.innerHTML = `
        #searchInput::placeholder {
          color: ${this.placeholderStyles[index].color};
          font-size: ${this.placeholderStyles[index].fontSize};
          font-weight: ${this.placeholderStyles[index].fontWeight};
        }
      `;
      document.head.appendChild(placeholderStyle);

      index = (index + 1) % this.placeholders.length;
    };

    updatePlaceholder();
    setInterval(updatePlaceholder, 2000);
    this.isLoggedIn = this.auth.istheUserLoggedIn();
    this.auth.loggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.auth.loggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.getCurrentUser(); // Fetch user details when login state changes
    });
  
 

    const user = this.auth.getLoggedInUser();
    if (user) {
      this.UserId = user.userId; // Ensure user object has an `id` property
      console.log("User ID in HeaderComponent:", this.UserId);
    }
    this.http.getUserCart().subscribe((res) => {
    // Assuming 'items' is the array of cart items
    this.cartItemCount = res ? res['items'].length : 0;
    console.log("Cart Item Count:", res);
      
    });

   this.http.cartcount(this.user.userId!).subscribe((res: any) => {
   this.cartItemCount = res.count;
   });
   

    this.isAdmin = this.auth.isAdmin();

    this.getCurrentUser();
    this.loadCartData()
  }
  
  loadCartData() {
    this.http.getUserCart().subscribe(res => {
      this.cartItemCount = res ? (res.data?.items.length ?? 0) : 0;
      console.log("Updated Cart Item Count:", this.cartItemCount);
    });

    // Also update the cart store
    this.store.dispatch(loadCart());
  }

  getCurrentUser() {
    // Simulate getting user data (Replace with actual API call)
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
    if (!this.currentUser || !this.currentUser.userId) {
      console.warn('No user data found');
    }
  }

  cartcount(){
    this.http.getUserCart().subscribe((res) => {
      // Assuming 'items' is the array of cart items
      this.cartItemCount = res ? res['items'].length : 0;
      console.log("Cart Item Count:", res);
        
    });
  }

  truncateName(name: string): string {
    return name.length > 13 ? name.slice(0, 13) + '...' : name;
  }

  getFullName(): string {
    return `${this.currentUser.userName}`;
  }

  navigateToHome(){
    if(this.isLoggedIn){
      this.router.navigate(['/home']);
    }else{
      this.alertService.error("Please log in to access Mit-Online.");
    }
  }

  logout() {
    this.auth.LogOut();
  }
  myProfile(): void {
    this.router.navigate(['user-profile/:id'+this.UserId]);
  }


}
