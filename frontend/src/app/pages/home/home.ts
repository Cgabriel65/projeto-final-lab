import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Texts } from '../../core/services/texts';
import { Text } from '../../core/models/text.model';
import { TextCard } from '../../shared/components/text-card/text-card';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';


@Component({
  selector: 'app-home',
  imports: [TextCard, LoadingSpinner],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private textsService = inject(Texts);
  private cdr = inject(ChangeDetectorRef);

  texts: Text[] = [];
  filteredTexts: Text[] = [];
  activeFilter = 'all';
  loading = true;
  error = '';

  genres = [
    { value: 'all', label: 'All' },
    { value: 'short_story', label: 'Short Story' },
    { value: 'poem', label: 'Poem' },
    { value: 'column', label: 'Column' },
    { value: 'other', label: 'Other' }
  ];

  ngOnInit() {
    this.textsService.getAll().subscribe({
      next: (data) => {
        this.texts = data;
        this.filteredTexts = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load texts';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  };

  filterByGenre(genre: string) {
    this.activeFilter = genre;
    if (genre === 'all') {
      this.filteredTexts = this.texts;
    } else {
      this.filteredTexts = this.texts.filter(t => t.genre === genre);
    }
  }
}

