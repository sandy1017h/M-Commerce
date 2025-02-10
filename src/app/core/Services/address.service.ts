import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../Models/Address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'https://localhost:7174/api/Address'; // Change based on your backend URL

  constructor(private http: HttpClient) {}

  // Add Address
  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}`, address);
  }

  // Get Address by UserId
  // getUserAddresses(userId: number): Observable<Address[]> {
  //   return this.http.get<Address[]>(`${this.apiUrl}/user/${userId}`);
  // }

  getUserAddresses(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  updateAddress(id: number, addressData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, addressData);
  }
  deleteAddress(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
