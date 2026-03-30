import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  ready = signal(false);

  ngOnInit() {
    this.http.get('https://backend-projeto-lab.onrender.com/').subscribe({
      next: () => this.ready.set(true),
      error: () => this.ready.set(true)
    });
  }
}