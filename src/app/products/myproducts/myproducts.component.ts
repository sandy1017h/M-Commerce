import { Component, OnInit } from '@angular/core';
import { MyProduct } from 'src/app/core/Models/myproduct';
import { AlertService } from 'src/app/core/Services/alert.service';
import { AuthService } from 'src/app/core/Services/auth.service';
import { MyproductService } from 'src/app/core/Services/myproduct.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit{

  products: any[] = [];

  constructor(
    private productService: MyproductService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  
  ngOnInit(): void {
    this.getMyProducts();
  }

  getMyProducts(): void {
    const user = this.authService.getLoggedInUser();
    if (user && user.userId) {
      this.productService.getMyProducts(user.userId).subscribe(
        (response: any) => {  // Use 'any' to handle unknown response structure
          if (response.isSuccessed && response.data) {
            this.products = response.data; // Extract 'data' array
          } else {
            this.products = [];
            this.alertService.error('No products found.');
          }
        },
        (error) => {
          console.error('Error fetching products:', error);
          this.alertService.error('Failed to load products.');
        }
      );
    } else {
      console.error('User ID is missing, cannot fetch products');
    }
  }
  

}
