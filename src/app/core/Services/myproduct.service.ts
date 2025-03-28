import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyProduct } from '../Models/myproduct';

@Injectable({
  providedIn: 'root'
})
export class MyproductService {

  private baseUrl = 'https://localhost:7174/api/Catalog'; // Updated base URL

  constructor(private http: HttpClient) { }

  // Add a new product
  addProduct(product: FormData): Observable<MyProduct> {
    return this.http.post<MyProduct>(`${this.baseUrl}/product/create`, product);
  }

  getMyProducts(userId: number): Observable<MyProduct[]> { 
    return this.http.get<MyProduct[]>(`${this.baseUrl}/product/myprodcts/${userId}`);
  }
  

}
