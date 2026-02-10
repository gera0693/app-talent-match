// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-match-detail-dialog',
//   imports: [],
//   templateUrl: './match-detail-dialog.html',
//   styleUrl: './match-detail-dialog.scss',
// })
// export class MatchDetailDialog {

// }

// import { Component, Inject, computed } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { DataService } from '../../services/data.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatDialogModule,
//     MatChipsModule,
//     MatProgressBarModule
//   ],
//   templateUrl: './match-detail-dialog.html'
// })
// export class MatchDetailDialogComponent {

//   job = this.data.job;
//   employee = this.data.employee;
  
//   matchedSkills = computed(() =>
//     this.job.skillIds.filter((id: number) =>
//       this.employee.skillIds.includes(id)
//     )
//   );

//   missingSkills = computed(() =>
//     this.job.skillIds.filter((id: number) =>
//       !this.employee.skillIds.includes(id)
//   )
//   );

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public dataService: DataService
//   ) {}
// }

import { Component, Inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataService } from '../../services/data.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  templateUrl: './match-detail-dialog.html'
})
export class MatchDetailDialogComponent {

  job = computed(() => this.data.job);
  employee = computed(() => this.data.employee);

  matchedSkills = computed(() =>
    this.job().skillIds.filter((id: number) =>
      this.employee().skillIds.includes(id)
    )
  );

  missingSkills = computed(() =>
    this.job().skillIds.filter((id: number) =>
      !this.employee().skillIds.includes(id)
    )
  );

  getSkillName(skillId: number): string {
    return this.dataService.skills().find(s => s.id === skillId)?.name ?? 'Unknown';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) {}
}

