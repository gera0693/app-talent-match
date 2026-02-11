import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, signal, computed } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-job-position-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './job-position-detail-dialog.html'
})
export class JobPositionDialogComponent {

  isEdit = computed(() => !!this.data?.job);

  title = signal('');
  description = signal('');
  skillIds = signal<number[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<JobPositionDialogComponent>,
    public dataService: DataService
  ) {
    if (data?.job) {
      this.title.set(data.job.title);
      this.description.set(data.job.description ?? '');
      this.skillIds.set(data.job.skillIds ?? []);
    }
  }

  save() {
    const job = {
      id: this.data?.job?.id ?? Date.now(),
      title: this.title(),
      description: this.description(),
      skillIds: this.skillIds()
    };

    this.dialogRef.close(job);
  }

  getSkillName(id: number): string {
    return this.dataService.skills().find(s => s.id === id)?.name ?? 'Unknown';
  }
}


