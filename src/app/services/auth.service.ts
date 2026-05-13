import { inject, Injectable, signal } from '@angular/core';
import { AuthUser } from '../models/auth-user.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'demo_user';
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  currentUser = signal<AuthUser | null>(this.getStoredUser());

  private users = [
    { username: 'admin', password: '1234', role: 'admin' as const },
    { username: 'user', password: '1234', role: 'user' as const }
  ];

  login(username: string, password: string): AuthUser | null {
    const found = this.employeeService.findByCredentials(username, password);

    if (!found) return null;

    const authUser: AuthUser = {
      name: found.name,
      username: found.username,
      role: found.role,
      skillIds: found.skillIds
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authUser));
    this.currentUser.set(authUser);

    return authUser;
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  hasRole(role: 'admin' | 'user'): boolean {
    return this.currentUser()?.role === role;
  }

  private getStoredUser(): AuthUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}
