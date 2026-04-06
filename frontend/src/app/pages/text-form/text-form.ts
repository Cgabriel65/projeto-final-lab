import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Texts } from '../../core/services/texts';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-text-form',
  imports: [ReactiveFormsModule],
  templateUrl: './text-form.html',
  styleUrl: './text-form.css'
})
export class TextForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private textsService = inject(Texts);
  private auth = inject(Auth);

  isEditMode = false;
  textId: string | null = null;
  loading = false;
  error = '';

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    body: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(50000)]),
    genre: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.textId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.textId;

    if (this.isEditMode && this.textId) {
      this.textsService.getById(this.textId).subscribe({
        next: (text) => {
          this.form.patchValue({
            title: text.title,
            body: text.body,
            genre: text.genre
          });
        },
        error: () => {
          this.error = 'Failed to load text';
        }
      });
    }
  }

  onSubmit() {

    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const user = this.auth.getCurrentUser();
    const { title, body, genre } = this.form.value;

    if (this.isEditMode && this.textId) {

      this.textsService.update(this.textId, {
        title: title!,
        body: body!,
        genre: genre!
      }).subscribe({
        next: (text) => this.router.navigate(['/texts', text.id]),
        error: () => {
          this.error = 'Failed to update text';
          this.loading = false;
        }
      });

    } else {

      this.textsService.create({
        title: title!,
        body: body!,
        genre: genre!,
        author_id: user!.id
      }).subscribe({
        next: (text) => this.router.navigate(['/texts', text.id]),
        error: () => {
          this.error = 'Failed to create text';
          this.loading = false;
        }
      });
    }
  }
}