import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgClass, SlicePipe, DatePipe } from '@angular/common'
import { Text } from '../../../core/models/text.model'

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [RouterLink, NgClass, SlicePipe, DatePipe],
  templateUrl: './text-card.html',
  styleUrl: './text-card.css'
})
export class TextCard {

  @Input() text!: Text
  @Input() showAuthor = true

  formatGenre(genre: string): string {
    switch (genre) {
      case 'short_story':
        return 'Short Story'
      case 'poem':
        return 'Poem'
      case 'column':
        return 'Column'
      default:
        return 'Other'
    }
  }

}