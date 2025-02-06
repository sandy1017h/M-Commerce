import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryResDto } from 'src/app/core/Models/catalog';
import { AuthService } from 'src/app/core/Services/auth.service';
import { selectCategories } from 'src/app/redux/catalog/catalog.selector';
import { AppState } from 'src/app/redux/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;
  categories$: Observable<CategoryResDto[]>;
  router: any;
  user: any;
  UserId: number | null = null;
  currentUser: any = null;   

  constructor(private store: Store<AppState>, public auth: AuthService) {
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

    const user = this.auth.getLoggedInUser();
    if (user) {
      this.UserId = user.userId; // Ensure user object has an `id` property
      console.log("User ID in HeaderComponent:", this.UserId);
    }
    this.getCurrentUser();
  
  }

  getCurrentUser() {
    // Simulate getting user data (Replace with actual API call)
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
    if (!this.currentUser || !this.currentUser.userId) {
      console.warn('No user data found');
    }
  }

  logout() {
    this.auth.LogOut();
  }
  myProfile(): void {
    this.router.navigate(['user-profile/:id'+this.UserId]);
  }
}
