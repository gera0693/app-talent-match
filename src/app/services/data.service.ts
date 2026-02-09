import { Injectable, signal } from '@angular/core';
import data from '../../assets/data.json';

@Injectable({ providedIn: 'root' })
export class DataService {
  skills = signal(data.skills);
  jobs = signal(data.jobs);
  employees = signal(data.employees);
}
