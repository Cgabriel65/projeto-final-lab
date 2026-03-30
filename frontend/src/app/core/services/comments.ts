import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Comments {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private apiUrl = 'https://backend-projeto-lab.onrender.com';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getByTextId(textId: string) {
    return this.http.get<Comment[]>(`${this.apiUrl}/texts/${textId}/comments`);
  }

  create(textId: string, data: { body: string; author_id: string }) {
    return this.http.post<Comment>(`${this.apiUrl}/texts/${textId}/comments`, data, { headers: this.getHeaders() });
  }
}