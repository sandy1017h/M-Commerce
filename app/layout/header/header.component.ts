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
  // categories: string[] = [
  //   'TV & Video',
  //   'Audio & Home Theater',
  //   'Mobile',
  //   'Computers',
  //   'Camera & Photo',
  //   'Wearable Technology'
  // ]

  categories$: Observable<CategoryResDto[]>;
  constructor(private store: Store<AppState>,public auth:AuthService) {
    this.categories$ = this.store.select(selectCategories);
  }
}
