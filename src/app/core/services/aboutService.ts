import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { AboutContent } from '../models/aboutInterface';

@Injectable({
  providedIn: 'root'
})
export class AboutServices {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/about';

  getAbout(): Observable<AboutContent> {
    return this.http.get<{ about: AboutContent }>(this.apiUrl).pipe(
      map(response => response.about)
    );
  }

  addAbout(data: AboutContent): Observable<AboutContent> {
    return this.http.post<{ about: AboutContent }>(this.apiUrl, data).pipe(
      map(response => response.about)
    );
  }

  updateAbout(data: Partial<AboutContent>): Observable<AboutContent> {
    return this.http.put<{ about: AboutContent }>(this.apiUrl, data).pipe(
      map(response => response.about)
    );
  }

  deleteAbout() {
    return this.http.delete(this.apiUrl);
  }
}
