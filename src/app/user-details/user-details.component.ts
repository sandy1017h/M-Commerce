import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../core/Services/address.service';
import { Address } from '../core/Models/Address';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  user: any;
  userId!: number;
  activeTab: string = 'profile'; // Default active tab
  showAddUpdateAddressForm: boolean = false;
  showAddAddressForm: boolean = false;
  buttonvisible: boolean = false;
  addressForm!: FormGroup;
  updateAddressForm! : FormGroup;
  addresses: any[] = [];
  selectedAddressIndex: number | null = null;
  selectedAddress: any;
  pendingOrdersCount = 3;

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    // Get user ID from route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id; // Convert string to number
        this.fetchUserById(this.userId);
      }
    });
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.updateAddressForm = this.fb.group({
      id:  [null],
      street: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      userId: [null, Validators.required], // Assuming userId is required
    });
    this.getUserAddresses();
  }

  getUserAddresses(): void {
    this.addressService.getUserAddresses(this.userId).subscribe({
      next: (data) => {
        this.addresses = data;
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

  selectAddress(index: number): void {
    this.selectedAddressIndex = index;
  }

  // editAddress(addresses: any) {
  //   this.selectedAddress = addresses;
  //   this.addressForm.patchValue(addresses);
  //   this.showAddUpdateAddressForm = !this.showAddUpdateAddressForm;
  // }
  editAddress(address: any) {
    this.selectedAddress = address; // Store selected address
    if (address) {
      this.updateAddressForm.patchValue({
        id: address.id, // Ensure ID is also patched
        street: address.street || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.postalCode || '',
        country: address.country || '',
        userId: address.userId // Ensure userId is included
      });
    }
    this.updateAddressForm.updateValueAndValidity();
    this.showAddUpdateAddressForm = true; 
  }
  

  // updateAddress() {
  //   if (this.updateAddressForm.valid) {
  //     const addressId = this.updateAddressForm.get('id')?.value;

  //     this.addressService.updateAddress(addressId, this.updateAddressForm.value).subscribe({
  //       next: (response) => {
  //         alert('Address updated successfully!');
  //         // Refresh address list without page reload
  //         this.selectedAddress = null;
  //         this.showAddUpdateAddressForm = false;
  //       },
  //       error: (err) => {
  //         console.error('Update failed:', err);
  //         alert('Failed to update address.');
  //       },
  //     });
  //   }
  // }


  updateAddress() {
    if (this.updateAddressForm.valid) {
      const addressId = this.updateAddressForm.get('id')?.value; // Ensure ID is fetched
  
      if (!addressId) {
        alert('Error: Address ID is missing.');
        return;
      }
  
      const updatedData = this.updateAddressForm.value;
      
      console.log('Sending data to API:', updatedData); // Debugging Log
  
      this.addressService.updateAddress(addressId, updatedData).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          alert('Address updated successfully!');
          this.showAddUpdateAddressForm = false; // Hide form after update
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update address.');
        },
      });
    }
  }
  

  

  fetchUserById(id: number): void {
    this.authService.getUserById(id).subscribe(
      (userData) => {
        this.user = userData;
        console.log(this.user.data);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  

  toggleAddUpdateAddressForm() {

    this.showAddUpdateAddressForm = !this.showAddUpdateAddressForm;
  }


  toggleAddAddressForm(){
    // this.isAddButtonVisibleAcheivement = !this.isAddButtonVisibleAcheivement;
    this.showAddAddressForm = !this.showAddAddressForm;
    this.buttonvisible = !this.buttonvisible;
    
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const newAddress: Address = {
        ...this.addressForm.value,
        userId: this.userId, // Attach userId from auth service
      };

      this.addressService.addAddress(newAddress).subscribe({
        next: (response) => {
          alert('Address added successfully!');
          this.addressForm.reset();
          window.location.reload();
          this.showAddAddressForm = false; 
        },
        error: (err) => {
          console.error('Error adding address:', err);
          alert('Failed to add address');
        }
      });
    }
  }

  deleteAddress(id: number) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe(() => {
        alert('Address deleted successfully!');
        this.addresses = this.addresses.filter(a => a.id !== id); // Remove from list
      });
    }
  }
  
  updateCancel(){
    this.showAddUpdateAddressForm = false;
  }
 }
