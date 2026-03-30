import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Texts } from '../../core/services/texts';
import { Text } from '../../core/models/text.model';
import { TextCard } from '../../shared/components/text-card/text-card';

@Component({
  selector: 'app-home',
  imports: [TextCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private textsService = inject(Texts);
  private cdr = inject(ChangeDetectorRef);

  texts: Text[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.textsService.getAll().subscribe({
      next: (data) => {
        this.texts = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load texts';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}

