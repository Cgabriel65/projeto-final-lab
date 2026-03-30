import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Text } from '../../../core/models/text.model';

@Component({
  selector: 'app-text-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './text-card.html',
  styleUrl: './text-card.css'
})
export class TextCard {
  @Input() text!: Text;
  @Input() showAuthor = true;
}