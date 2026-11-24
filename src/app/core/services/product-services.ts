import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Product } from '../models/productInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductServices {
  private http = inject(HttpClient);

  private menUrl = 'http://localhost:3000/men';
  private womenUrl = 'http://localhost:3000/women';

  getMenProducts(): Observable<Product[]> {
    return this.http.get<{ allClothing: Product[] }>(this.menUrl).pipe(
      map(response => response.allClothing || [])
    );
  }

  getWomenProducts(): Observable<Product[]> {
    return this.http.get<{ allClothing: Product[] }>(this.womenUrl).pipe(
      map(response => response.allClothing || [])
    );
  }

  getProductDetails(id: string, type: 'men' | 'women'): Observable<Product> {
    const url = type === 'men' ? this.menUrl : this.womenUrl;

    return this.http.get<{ myClothing: Product }>(`${url}/${id}`).pipe(
      map(response => response.myClothing)
    );
  }

  addProduct(product: Product, type: 'men' | 'women') {
    const url = type === 'men' ? this.menUrl : this.womenUrl;
    return this.http.post(url, product);
  }

  updateProduct(id: string, product: Product, type: 'men' | 'women') {
    const url = type === 'men' ? this.menUrl : this.womenUrl;
    return this.http.put(`${url}/${id}`, product);
  }

  deleteProduct(id: string, type: 'men' | 'women') {
    const url = type === 'men' ? this.menUrl : this.womenUrl;
    return this.http.delete(`${url}/${id}`);
  }
}
