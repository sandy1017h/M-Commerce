import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-seller-payment',
  standalone: true,
  imports: [FormsModule,BrowserModule],
  templateUrl: './seller-payment.component.html',
  styleUrls: ['./seller-payment.component.css']
})
export class SellerPaymentComponent {

}
