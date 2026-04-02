import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../core/models/user.model';
import { TextCard } from '../../shared/components/text-card/text-card';
import { DatePipe } from '@angular/common';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';


@Component({
  selector: 'app-author-profile',
  imports: [RouterLink, TextCard, DatePipe, LoadingSpinner],
  templateUrl: './author-profile.html',
  styleUrl: './author-profile.css'
})
export class AuthorProfile implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private apiUrl = 'https://backend-projeto-lab.onrender.com';

  profile: Profile | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.http.get<Profile>(`${this.apiUrl}/authors/${id}`).subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Author not found';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}