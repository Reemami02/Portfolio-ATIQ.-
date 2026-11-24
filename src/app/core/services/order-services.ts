import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderServices {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/orders';

  getOrders() {
    return this.http.get<any>(this.apiUrl);
  }

  checkout(userId: string) {
    return this.http.post<any>(`${this.apiUrl}/checkout`, { userId });
  }

  updateStatus(id: string, status: string) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { status });
  }

  deleteOrder(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
