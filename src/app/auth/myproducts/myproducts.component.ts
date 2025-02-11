import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent {

  product = {
    name: '',
    description: '',
    price: null,
    category: '',
    image: null
  };
  categories = ['Electronics', 'Clothing', 'Furniture', 'Sports', 'Books'];

  onSubmit() {
    // Logic to handle product submission (e.g., call to API to save the product)
    console.log('Product added:', this.product);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;
    }
  }
}
