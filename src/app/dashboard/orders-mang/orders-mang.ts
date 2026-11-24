import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderServices } from '../../core/services/order-services';

@Component({
  selector: 'app-orders-mang',
  imports: [CommonModule],
  templateUrl: './orders-mang.html',
  styleUrl: './orders-mang.css'
})
export class OrdersMang implements OnInit {
  private orderService = inject(OrderServices);

  orders: any[] = [];
  message = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: response => {
        this.orders = response.orders || [];
      },
      error: () => {
        this.message = 'Could not load orders.';
      }
    });
  }

  update(order: any, event: Event): void {
    const status = (event.target as HTMLSelectElement).value;

    this.orderService.updateStatus(order._id, status).subscribe({
      next: () => this.loadOrders(),
      error: () => {
        this.message = 'Could not update order.';
      }
    });
  }

  remove(id: string): void {
    if (!confirm('Delete this order?')) {
      return;
    }

    this.orderService.deleteOrder(id).subscribe({
      next: () => this.loadOrders(),
      error: () => {
        this.message = 'Could not delete order.';
      }
    });
  }
}
