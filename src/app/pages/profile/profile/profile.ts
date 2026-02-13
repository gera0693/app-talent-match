import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container" *ngIf="auth.currentUser() as user">
      <h2>User Profile</h2>

      <label>Username</label>
      <input [(ngModel)]="username" />

      <p><strong>Role:</strong> {{ user.role }}</p>

      <button (click)="save()">Save Changes</button>
      <button (click)="auth.logout()">Logout</button>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 400px;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `]
})
export class Profile {

  username = '';

  constructor(public auth: AuthService) {
    const user = this.auth.currentUser();
    if (user) {
      this.username = user.username;
    }
  }

  save() {
    const user = this.auth.currentUser();
    if (!user) return;

    const updated = { ...user, username: this.username };

    localStorage.setItem('demo_user', JSON.stringify(updated));
    this.auth.currentUser.set(updated);

    alert('Profile updated!');
  }
}
