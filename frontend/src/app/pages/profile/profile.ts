import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Auth } from '../../core/services/auth';
import { ProfileService } from '../../core/services/profile';
import { Profile } from '../../core/models/user.model';
import { Text as StoryText } from '../../core/models/text.model';
import { TextCard } from '../../shared/components/text-card/text-card';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, ReactiveFormsModule, DatePipe, TextCard, LoadingSpinner],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfilePage implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(Auth);
  private profileService = inject(ProfileService);

  profile: Profile | null = null;
  likedTexts: StoryText[] = [];
  loading = true;
  error = '';
  editMode = false;
  updateError = '';
  updateSuccess = false;

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bio: new FormControl('')
  });

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    this.profileService.getProfile(user.id).subscribe({
      next: (data) => {
        this.profile = data;
        this.form.patchValue({
          username: data.username,
          bio: data.bio ?? ''
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load profile';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.profileService.getLikedTexts(user.id).subscribe({
      next: (data) => {
        this.likedTexts = data.map(item => item.texts);
        this.cdr.detectChanges();
      }
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.updateError = '';
    this.updateSuccess = false;
  }

  saveProfile() {
    if (this.form.invalid) return;

    const user = this.auth.getCurrentUser();
    if (!user) return;

    const { username, bio } = this.form.value;

    this.profileService.updateProfile(user.id, {
      username: username!,
      bio: bio ?? ''
    }).subscribe({

      next: (data) => {
        this.profile = { ...data, texts: this.profile?.texts };
        this.editMode = false;
        this.updateSuccess = true;
        this.cdr.detectChanges();
      },

      error: () => {
        this.updateError = 'Failed to update profile';
        this.cdr.detectChanges();
      }
    });
  }
}