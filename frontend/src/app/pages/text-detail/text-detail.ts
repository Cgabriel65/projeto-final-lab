import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Texts } from '../../core/services/texts';
import { Comments } from '../../core/services/comments';
import { Likes } from '../../core/services/likes';
import { Text } from '../../core/models/text.model';
import { Comment } from '../../core/models/comment.model';
import { Auth } from '../../core/services/auth';
import { CommentItem } from '../../shared/components/comment-item/comment-item';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-text-detail',
  imports: [RouterLink, CommentItem, LoadingSpinner, ReactiveFormsModule, DatePipe],
  templateUrl: './text-detail.html',
  styleUrl: './text-detail.css'
})
export class TextDetail implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private textsService = inject(Texts);
  private commentsService = inject(Comments);
  private likesService = inject(Likes);
  private router = inject(Router);
  auth = inject(Auth);

  text: Text | null = null;
  comments: Comment[] = [];
  loading = true;
  error = '';
  likeCount = 0;
  hasLiked = false;

  commentForm = new FormGroup({
    body: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  isAuthor(): boolean {
    return this.auth.getCurrentUser()?.id === this.text?.author_id;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.textsService.getById(id).subscribe({
      next: (data) => {
        this.text = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Text not found';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.commentsService.getByTextId(id).subscribe({
      next: (data) => {
        this.comments = data;
        this.cdr.detectChanges();
      }
    });

    this.likesService.getCount(id).subscribe({
      next: (data) => {
        this.likeCount = data.count;
        this.cdr.detectChanges();
      }
    });

    const user = this.auth.getCurrentUser();
    if (user) {
      this.likesService.hasLiked(id, user.id).subscribe({
        next: (data) => {
          this.hasLiked = data.liked;
          this.cdr.detectChanges();
        }
      });
    }
  }

  toggleLike() {
    if (!this.auth.isLoggedIn()) return;

    const user = this.auth.getCurrentUser();
    const id = this.route.snapshot.paramMap.get('id')!;

    if (this.hasLiked) {
      this.likesService.unlike(id, user!.id).subscribe({
        next: () => {
          this.hasLiked = false;
          this.likeCount--;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.likesService.like(id, user!.id).subscribe({
        next: () => {
          this.hasLiked = true;
          this.likeCount++;
          this.cdr.detectChanges();
        }
      });
    }
  }

  submitComment() {
    if (this.commentForm.invalid || !this.auth.isLoggedIn()) return;

    const user = this.auth.getCurrentUser();
    const id = this.route.snapshot.paramMap.get('id')!;

    this.commentsService.create(id, {
      body: this.commentForm.value.body!,
      author_id: user!.id
    }).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.commentForm.reset();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to submit comment';
      }
    });
  }

  deleteText() {
    if (!confirm('Are you sure you want to delete this text?')) return;

    this.textsService.delete(this.text!.id).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.error = 'Failed to delete text'
    });
  }
}