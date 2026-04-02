import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Text } from '../models/text.model';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Texts {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private apiUrl = 'https://backend-projeto-lab.onrender.com';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getAll() {
    return this.http.get<Text[]>(`${this.apiUrl}/texts`);
  }

  getById(id: string) {
    return this.http.get<Text>(`${this.apiUrl}/texts/${id}`);
  }

  create(data: { title: string; body: string; genre: string; author_id: string }) {
    return this.http.post<Text>(`${this.apiUrl}/texts`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: { title: string; body: string; genre: string }) {
    return this.http.put<Text>(`${this.apiUrl}/texts/${id}`, data, { headers: this.getHeaders() });
  }
  //
  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/texts/${id}`, { headers: this.getHeaders() });
  }
}