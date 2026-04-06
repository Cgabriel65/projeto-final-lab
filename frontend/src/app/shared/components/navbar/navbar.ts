import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  auth = inject(Auth);
  private router = inject(Router);
  isDark = false;

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    this.isDark = saved === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}