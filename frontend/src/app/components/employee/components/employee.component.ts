import { Component, ViewChildren } from '@angular/core';
import {EmployeeService} from'../services/employee.service'
import { Customer } from '../models/model';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
    @ViewChildren('buttonClose') buttonClose!:any;
    public employee!: any;
    public form : FormGroup = new FormGroup({});
    public first = 0;
    public labelModal = 'Agregar empleado';
    public idSupplier = '';
    public isEdit = false;
    public rows = 10;

    constructor(
        private employeeService: EmployeeService,
        public formBuilder:FormBuilder,
        public _flashMessagesService:FlashMessagesService,
    ) {}

    ngOnInit() {
        this.createForm();
        this.getEmployee();
    }

    createForm(){
        this.form = this.formBuilder.group({
            name: new FormControl(""),
            lastName: new FormControl(""),
            identification: new FormControl(""),
            city: new FormControl(""),
            phoneNumber: new FormControl(""),
            birthdate: new FormControl(""),
        });
    }

    getEmployee(){
        this.employeeService.getEmployee().subscribe(res=>{
            this.employee = res;
        });
    }

    createNewEmployee(){
        this.employeeService.createEmployee(this.form.value).subscribe(res =>{
            this.resetModal();
            this.buttonClose.first.nativeElement.click();
            this.getEmployee();
        })
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event:any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.employee ? this.first === this.employee.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.employee ? this.first === 0 : true;
    }

    saveEmployee(){
        if(this.isEdit)return this.savedEmployeeUpdate();
        this.createNewEmployee();
    }

    deleteEmployee(suppliersId:string){
        this.employeeService.deleteSupplier(suppliersId).subscribe(res =>{
          this._flashMessagesService.show('Empleado eliminado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
          return this.getEmployee();
        },
        err=> this._flashMessagesService.show('Fallo al eliminar el empleado', { cssClass: 'alert-danger', timeout: 4000 }))
    }
    
    editEmployee(supplierId:string){
      this.idSupplier = supplierId;
      this.isEdit = true;
      this.labelModal = 'Editar empleado'
      this.employeeService.getEmployeeById(supplierId).subscribe(res =>{
        this.form.patchValue(res);
      }, err=>{
        this.resetModal();
        this.buttonClose.first.nativeElement.click();
        this._flashMessagesService.show('Fallo al eliminar el empleado', { cssClass: 'alert-danger', timeout: 4000 })
      });
    }
    
    savedEmployeeUpdate(){
      this.employeeService.PutEmployee(this.idSupplier, this.form.value).subscribe(res =>{
        this.resetModal();
        this.buttonClose.first.nativeElement.click();
        this._flashMessagesService.show('Empleado editado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
        return this.getEmployee();
      },
      err=> {
        this.buttonClose.first.nativeElement.click();
        this.resetModal();
        this._flashMessagesService.show('Fallo al editar el empleado', { cssClass: 'alert-danger', timeout: 4000 });
      })
    }

    resetModal(){
        this.isEdit = false;
        this.idSupplier = '';
        this.labelModal = 'Crear empleado';
        this.createForm();
    }
}
