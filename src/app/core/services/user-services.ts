import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/user';

  getUsers() {
    return this.http.get<any>(this.apiUrl);
  }

  addUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  updateUser(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
