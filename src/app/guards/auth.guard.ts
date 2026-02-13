import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRole = route.data?.['role'] as 'admin' | 'user' | undefined;

  if (requiredRole && user.role !== requiredRole) {

    if (user.role === 'admin') {
      router.navigate(['/matcher']);
    } else {
      router.navigate(['/profile']);
    }

    return false;
  }

  return true;
};
