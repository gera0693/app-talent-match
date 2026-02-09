import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatCardModule,
    MatSelectModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('talent-match');
}
