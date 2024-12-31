import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { TableModule } from 'primeng/table';
import { EmployeeService } from './services/employee.service';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
  ],
  providers:[EmployeeService]
})
export class EmployeeModule { }
