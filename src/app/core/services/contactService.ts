import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactServices {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/contactUs';

  getContactInfo() {
    return this.http.get<any>(this.apiUrl);
  }

  saveContactInfo(data: any) {
    return this.http.put<any>(this.apiUrl, data);
  }

  sendMessage(data: { name: string; email: string; message: string }) {
    return this.http.post<any>(`${this.apiUrl}/message`, data);
  }

  getMessages() {
    return this.http.get<any>(`${this.apiUrl}/message`);
  }

  deleteMessage(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/message/${id}`);
  }
}
