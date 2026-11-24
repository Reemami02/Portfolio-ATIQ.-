import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServices {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cart';

  getCart(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  addToCart(data: any) {
    return this.http.post<any>(`${this.apiUrl}/add`, data);
  }

  updateQuantity(data: any) {
    return this.http.put<any>(`${this.apiUrl}/update`, data);
  }

  removeItem(data: any) {
    return this.http.delete<any>(`${this.apiUrl}/remove`, { body: data });
  }

  clearCart(userId: string) {
    return this.http.delete<any>(`${this.apiUrl}/clear/${userId}`);
  }
}
