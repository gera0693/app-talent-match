import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, computed, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { calculateMatch } from '../../utils/matcher.utils';
import { DataService } from '../../services/data.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-matcher',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,  
    MatListModule
  ],
  templateUrl: './matcher.html',
  styleUrl: './matcher.scss',
})
export class Matcher {

  selectedJobId = signal<number | null>(null);

  selectedJob = computed(() =>
    this.data.jobs().find(j => j.id === this.selectedJobId())
  );

  matches = computed(() => {
    const job = this.selectedJob();
    if (!job) return [];

    return this.data.employees()
      .map(e => ({
        employee: e,
        percentage: calculateMatch(job.skillIds, e.skillIds)
      }))
      .sort((a, b) => b.percentage - a.percentage);
  });

  constructor(public data: DataService) {}
}
