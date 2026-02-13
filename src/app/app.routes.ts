import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: 'matcher',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/matcher/matcher')
        .then(m => m.Matcher),
    data: { role: 'admin' } 
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile/profile')
        .then(m => m.Profile),
    data: { role: 'user' }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
