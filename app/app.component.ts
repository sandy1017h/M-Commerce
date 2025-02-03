import { Component, OnInit } from '@angular/core';
import { CatalogState } from './redux/catalog/catalog.reducer';
import { Store } from '@ngrx/store';
import { selectCategories } from './redux/catalog/catalog.selector';
import { CategoryResDto } from './core/Models/catalog';
import { Observable, tap } from 'rxjs';
import { loadCategories } from './redux/catalog/catalog.action';
import { AppState } from './redux/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  categories$: Observable<CategoryResDto[]>;
  constructor(private store: Store<AppState>) {
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit(): void {
    // Check if products list is empty and dispatch loadProducts action
    this.categories$
      .pipe(
        // Tap operator to side-effect (i.e., dispatch action when necessary)
        tap((categories) => {
          if (categories.length === 0) {
            // Dispatch the action to load products if the list is empty
            this.store.dispatch(loadCategories());
          }
        })
      )
      .subscribe();
  }


}
