import { Component } from '@angular/core';
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
export class HeaderComponent {
  categories$: Observable<CategoryResDto[]>;

  constructor(private store: Store<AppState>, public auth: AuthService) {
    this.categories$ = this.store.select(selectCategories);
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
  }
}
