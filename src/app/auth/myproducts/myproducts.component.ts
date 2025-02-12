import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyBrand } from 'src/app/core/Models/mybrand';
import { MyCategory } from 'src/app/core/Models/mycategory';
import { CatalogService } from 'src/app/core/Services/catalog.service';
import { MybrandService } from 'src/app/core/Services/mybrand.service';
import { MycategoryService } from 'src/app/core/Services/mycategory.service';
import { MyproductService } from 'src/app/core/Services/myproduct.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
  productForm: FormGroup;
  brands: MyBrand[] = [];
  categories: MyCategory[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: MyproductService,
    private brandService: MybrandService,
    private categoryService: MycategoryService,
    private cdRef: ChangeDetectorRef
    , private http: HttpClient,
    private catalogservice: CatalogService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      originalPrice: ['', [Validators.required, Validators.min(0)]],
      discountPercentage: [null],
      discountAmount: [null],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      thumbnail: [null],
    });
  }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    console.log('Brands:', this.brands);
    console.log('Categories:', this.categories);
  }

  loadBrands(): void {
    console.log('🔵 Fetching brands...');
    this.brandService.getBrands().subscribe(
      (brands: MyBrand[]) => {  // ✅ Expecting an array
        this.brands = brands; // ✅ Assign it directly
        console.log('✅ Brands updated:', this.brands);
      },
      (error) => {
        console.error('❌ Error fetching brands:', error);
      }
    );
  }
  
  
  loadCategories(): void {
    console.log('🔵 Fetching categories...');
    this.categoryService.getCategories().subscribe(
      (categories: MyCategory[]) => {  // ✅ Expecting an array
        this.categories = categories;
        console.log('✅ Categories updated:', this.categories);
      },
      (error) => {
        console.error('❌ Error fetching categories:', error);
      }
    );
  }
  
  
  
  

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.controls).forEach((key) => {
        if (key === 'thumbnail' && this.selectedFile) {
          formData.append(key, this.selectedFile);
        } else {
          formData.append(key, this.productForm.get(key)?.value);
        }
      });

      this.productService.addProduct(formData).subscribe(
        (response) => {
          console.log('Product added successfully', response);
          this.productForm.reset(); // ✅ Reset the form
          alert('Product added successfully!');
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
