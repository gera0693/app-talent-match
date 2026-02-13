import { Injectable, signal } from '@angular/core';
import employeesData from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private STORAGE_KEY = 'employees_data';

  employees = signal<any[]>(this.loadEmployees());

  private loadEmployees() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : employeesData.employees;
  }

  saveEmployees() {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.employees())
    );
  }

  findByCredentials(username: string, password: string) {
    return this.employees().find(
      e => e.username === username && e.password === password
    );
  }

//   updateEmployee(updated: any) {
//     const updatedList = this.employees().map(e =>
//       e.id === updated.id ? updated : e
//     );

//     this.employees.set(updatedList);
//     this.saveEmployees();
//   }
    updateEmployee(updated: any) {
        const employees = this.loadEmployees();

        const index = employees.findIndex((e: { id: any; }) => e.id === updated.id);

        if (index !== -1) {
            employees[index] = updated;
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    }

  findById(id: number) {
    return this.employees().find(e => e.id === id);
  }
}
