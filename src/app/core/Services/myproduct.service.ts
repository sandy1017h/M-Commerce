import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyProduct } from '../Models/myproduct';
@Injectable({
  providedIn: 'root'
})
export class MyproductService {

  private baseUrl = 'https://localhost:7174/api/Catalog/product/create'; // Update with your API URL

  

  constructor(private http: HttpClient) {}

  addProduct(product: FormData): Observable<MyProduct> {
    return this.http.post<MyProduct>(`${this.baseUrl}`, product);
  }}
