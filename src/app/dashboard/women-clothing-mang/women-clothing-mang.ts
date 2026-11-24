import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductServices } from '../../core/services/product-services';
import { Product } from '../../core/models/productInterface';

@Component({
  selector: 'app-women-clothing-mang',
  imports: [CommonModule, FormsModule],
  templateUrl: './women-clothing-mang.html',
  styleUrl: './women-clothing-mang.css'
})
export class WomenClothingMang implements OnInit {
  private productService = inject(ProductServices);

  products: Product[] = [];
  editingId = '';
  message = '';

  form: Product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0
  };

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getWomenProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: () => {
        this.message = 'Could not load products. Check backend.';
      }
    });
  }

  edit(product: Product): void {
    this.editingId = product._id || '';
    this.form = { ...product };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reset(): void {
    this.editingId = '';
    this.form = {
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      stock: 0
    };
  }

  save(): void {
    if (!this.form.name || this.form.price < 0 || this.form.stock < 0) {
      this.message = 'Please enter valid product data.';
      return;
    }

    const request = this.editingId
      ? this.productService.updateProduct(this.editingId, this.form, 'women')
      : this.productService.addProduct(this.form, 'women');

    request.subscribe({
      next: () => {
        this.message = this.editingId ? 'Product updated.' : 'Product added.';
        this.reset();
        this.loadProducts();
      },
      error: error => {
        this.message = error.error?.error || 'Could not save product.';
      }
    });
  }

  remove(id?: string): void {
    if (!id || !confirm('Delete this product?')) {
      return;
    }

    this.productService.deleteProduct(id, 'women').subscribe({
      next: () => {
        this.message = 'Product deleted.';
        this.loadProducts();
      },
      error: () => {
        this.message = 'Could not delete product.';
      }
    });
  }
}
