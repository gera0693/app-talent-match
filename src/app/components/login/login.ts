import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-wrapper">
      <mat-card class="login-card">

        <h2 class="title">Talent Match Login</h2>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Username</mat-label>
          <input
            matInput
            [(ngModel)]="username"
            placeholder="Enter username"
          />
          <mat-icon matSuffix>person</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Password</mat-label>
          <input
            matInput
            [(ngModel)]="password"
            type="password"
            placeholder="Enter password"
            (keyup.enter)="login()"
          />
          <mat-icon matSuffix>lock</mat-icon>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          class="full-width"
          (click)="login()"
        >
          Login
        </button>

        <p class="error" *ngIf="error()">
          Invalid credentials
        </p>

        <div class="demo-info">
          <small>
            <strong>Demo accounts:</strong><br />
            admin / 1234<br />
            user / 1234
          </small>
        </div>

      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrapper {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1f2937, #111827);
    }

    .login-card {
      width: 380px;
      padding: 24px;
      border-radius: 12px;
    }

    .title {
      text-align: center;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .error {
      color: #f44336;
      text-align: center;
      margin-top: 10px;
    }

    .demo-info {
      margin-top: 20px;
      text-align: center;
      opacity: 0.7;
    }
  `]
})
export class LoginComponent {

  username = '';
  password = '';
  error = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.error.set(false);

    const user = this.auth.login(this.username, this.password);

    if (!user) {
      this.error.set(true);
      return;
    }

    if (user.role === 'admin') {
      this.router.navigate(['/matcher']);
    } else {
      this.router.navigate(['/profile']);
    }
  }
}
