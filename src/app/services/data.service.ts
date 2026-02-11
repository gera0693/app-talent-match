import { Injectable, signal } from '@angular/core';
import data from '../../assets/data.json';

export interface Employee {
  id: number;
  name: string;
  skillIds: number[];
}

export interface JobPosition {
  id: number;
  title: string;
  description?: string;
  skillIds: number[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  skills = signal(data.skills);
  jobs = signal(data.jobs);
  employees = signal(data.employees);

  addEmployee(employee: Employee) {
    const current = this.employees();

    const newEmployee: Employee = {
      ...employee,
      id: employee.id || this.getNextEmployeeId(current)
    };

    this.employees.set([...current, newEmployee]);
  }

  updateEmployee(employee: Employee) {
    this.employees.set(
      this.employees().map(e =>
        e.id === employee.id ? { ...employee } : e
      )
    );
  }

  private getNextEmployeeId(employees: Employee[]): number {
    return employees.length
      ? Math.max(...employees.map(e => e.id)) + 1
      : 1;
  }

  addJob(job: JobPosition) {
    const current = this.jobs();

    const newJob: JobPosition = {
      ...job,
      id: job.id || this.getNextJobId(current)
    };

    this.jobs.set([...current, newJob]);
  }

  updateJob(job: JobPosition) {
    this.jobs.set(
      this.jobs().map(j =>
        j.id === job.id ? { ...job } : j
      )
    );
  }

  private getNextJobId(jobs: JobPosition[]): number {
    return jobs.length
      ? Math.max(...jobs.map(j => j.id)) + 1
      : 1;
  }
}
