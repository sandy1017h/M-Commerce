import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders: { 
    id: number; 
    orderDate: string; 
    totalAmount: number; 
    status: string; 
  }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders = [
      { id: 101, orderDate: '2024-03-10', totalAmount: 199.99, status: 'Completed' }, 
      { id: 102, orderDate: '2024-03-11', totalAmount: 349.50, status: 'Pending' },
      { id: 103, orderDate: '2024-03-12', totalAmount: 149.75, status: 'Cancelled' },
      { id: 103, orderDate: '2024-03-12', totalAmount: 149.75, status: 'Cancelled' }
    ];
  }

  viewOrderDetails(order: any): void {
    console.log('Order Details:', order);
  }

}
