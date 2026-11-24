import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServices } from '../../core/services/auth-services';
import { CartServices } from '../../core/services/cart-services';
import { OrderServices } from '../../core/services/order-services';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  private authService = inject(AuthServices);
  private cartService = inject(CartServices);
  private orderService = inject(OrderServices);

  cart: any = null;
  total = 0;
  message = '';

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = this.authService.currentUser?._id;

    if (!userId) {
      return;
    }

    this.cartService.getCart(userId).subscribe({
      next: response => {
        this.cart = response.myCart;
        this.total = response.totalPrice || 0;
      },
      error: () => {
        this.cart = null;
        this.total = 0;
      }
    });
  }

  checkout(): void {
    const userId = this.authService.currentUser?._id;

    if (!userId) {
      return;
    }

    this.orderService.checkout(userId).subscribe({
      next: () => {
        this.message = 'Your order has been placed.';
        this.loadCart();
      },
      error: error => {
        this.message = error.error?.message || 'Could not place order.';
      }
    });
  }

  change(item: any, quantity: number): void {
    if (quantity < 1) {
      return;
    }

    const userId = this.authService.currentUser?._id;

    this.cartService.updateQuantity({
      userId,
      productId: item.productId._id,
      productType: item.productType,
      quantity
    }).subscribe({
      next: () => this.loadCart(),
      error: error => {
        this.message = error.error?.message || 'Could not update quantity.';
      }
    });
  }

  remove(item: any): void {
    const userId = this.authService.currentUser?._id;

    this.cartService.removeItem({
      userId,
      productId: item.productId._id,
      productType: item.productType
    }).subscribe({
      next: () => this.loadCart(),
      error: () => {
        this.message = 'Could not remove item.';
      }
    });
  }
}
