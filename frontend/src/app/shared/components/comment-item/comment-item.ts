import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-comment-item',
  imports: [DatePipe],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css'
})
export class CommentItem {
  @Input() comment!: Comment;
}