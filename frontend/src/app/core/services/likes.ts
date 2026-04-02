import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Likes {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private apiUrl = 'https://backend-projeto-lab.onrender.com';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getCount(textId: string) {
    return this.http.get<{ count: number }>(`${this.apiUrl}/texts/${textId}/likes`);
  }

  hasLiked(textId: string, userId: string) {
    return this.http.get<{ liked: boolean }>(`${this.apiUrl}/texts/${textId}/likes/${userId}`);
  }

  like(textId: string, userId: string) {
    return this.http.post(`${this.apiUrl}/texts/${textId}/likes`, { user_id: userId }, { headers: this.getHeaders() });
  }

  unlike(textId: string, userId: string) {
    return this.http.delete(`${this.apiUrl}/texts/${textId}/likes`, {
      headers: this.getHeaders(),
      body: { user_id: userId }
    });
  }
}