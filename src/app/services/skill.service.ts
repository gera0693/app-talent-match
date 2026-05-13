import { Injectable } from '@angular/core';
import data from '../../assets/data.json';

@Injectable({ providedIn: 'root' })
export class SkillService {

  private skills = data.skills;

  getSkills() {
    return this.skills;
  }
}
