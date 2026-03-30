import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TextDetail } from './pages/text-detail/text-detail';
import { AuthorProfile } from './pages/author-profile/author-profile';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { TextForm } from './pages/text-form/text-form';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'texts/new', component: TextForm, canActivate: [authGuard] },
    { path: 'texts/:id', component: TextDetail },
    { path: 'authors/:id', component: AuthorProfile },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'texts/:id/edit', component: TextForm, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }


];
