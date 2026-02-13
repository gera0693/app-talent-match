import { EmployeeService } from '../../../services/employee.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SkillService } from '../../../services/skill.service';
import { AuthService } from '../../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Component, inject, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule
  ],
  template: `
    <mat-card *ngIf="user">
      <h2>My Profile</h2>

      <!-- Name -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="user.name" />
      </mat-form-field>

      <!-- Skills selector -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Select Skills</mat-label>
        <mat-select
          multiple
          [(ngModel)]="user.skillIds"
        >
          <mat-option
            *ngFor="let skill of allSkills"
            [value]="skill.id"
          >
            {{ skill.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <!-- Selected skills as chips -->
      <div class="chip-container">
        <mat-chip-set>
          <mat-chip *ngFor="let skill of selectedSkills()">
            {{ skill.name }}
          </mat-chip>
        </mat-chip-set>
      </div>

      <button
        mat-raised-button
        color="primary"
        (click)="save()"
      >
        Save Changes
      </button>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 700px;
      margin: 40px auto;
      padding: 24px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .chip-container {
      margin-bottom: 20px;
    }
  `]
})
export class ProfileComponent implements OnInit {

  auth = inject(AuthService);
  employeeService = inject(EmployeeService);
  skillService = inject(SkillService);

  user: any;
  allSkills: any[] = [];

  ngOnInit() {
    this.user = structuredClone(this.auth.currentUser());
    this.allSkills = this.skillService.getSkills();
  }

  selectedSkills() {
    if (!this.user?.skillIds) return [];

    return this.allSkills.filter(skill =>
      this.user.skillIds.includes(skill.id)
    );
  }

  save() {
    this.employeeService.updateEmployee(this.user);

    localStorage.setItem('demo_user', JSON.stringify(this.user));
    this.auth.currentUser.set(this.user);

    alert('Profile updated successfully!');
  }
}
