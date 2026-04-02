import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';
import { Profile } from '../models/user.model';
import { Text as StoryText } from '../models/text.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private apiUrl = 'https://backend-projeto-lab.onrender.com';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getProfile(id: string) {
    return this.http.get<Profile>(`${this.apiUrl}/profile/${id}`);
  }

  updateProfile(id: string, data: { bio: string; username: string }) {
    return this.http.put<Profile>(`${this.apiUrl}/profile/${id}`, data, { headers: this.getHeaders() });
  }

  getLikedTexts(id: string) {
    return this.http.get<{ text_id: string; texts: StoryText }[]>(`${this.apiUrl}/profile/${id}/liked-texts`);
  }
}