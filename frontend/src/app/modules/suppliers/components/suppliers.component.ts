import { Component, ViewChildren } from '@angular/core';
import { SuppliersService } from '../services/suppliers.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent {
  @ViewChildren('buttonClose') buttonClose!:any;
  public suppliers!: any;
  public form:FormGroup = new FormGroup({});
  public first = 0;
  public rows = 10;
  public labelModal = 'Agregar proveedor';
  public isEdit = false;

  public idSupplier = '';

  constructor(
    private supplierService: SuppliersService,
    public formBuilder:FormBuilder,
    public _flashMessagesService: FlashMessagesService,
  ) {}

  ngOnInit() {
    this.createForm();
    this.getSuppliers();
  }

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe(res=>{
      this.suppliers = res;
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
    return this.suppliers ? this.first === this.suppliers.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.suppliers ? this.first === 0 : true;
  }
  createForm(){
    this.form = this.formBuilder.group({
        name: new FormControl(""),
        categoryAfip: new FormControl(""),
        categoryProducts: new FormControl(""),
        cuit: new FormControl(""),
        city: new FormControl(""),
        phoneNumber: new FormControl(""),
    });
  }

  saveSuppliers(){
    if(this.isEdit)return this.savedSupplierUpdate();
    this.createNewSuppliers();
  }

  createNewSuppliers(){
    this.buttonClose.first.nativeElement.click();
    if(this.form.value.name == '' ||this.form.value.categoryAfip == '' || this.form.value.categoryProducts == '' || this.form.value.cuit == '' || this.form.value.city == '' || this.form.value.phoneNumber == '' )return;
    this.supplierService.createNewSupplier(this.form.value).subscribe(res =>{
      this.buttonClose.first.nativeElement.click();
            this.createForm();
      this._flashMessagesService.show('Proveedor creado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
      return this.getSuppliers();
    },err=> {
      this._flashMessagesService.show('Fallo al crear el proveedor', { cssClass: 'alert-danger', timeout: 4000 });
      this.buttonClose.first.nativeElement.click();
  })
  }

  deleteSuppliers(suppliersId:string){
    this.supplierService.deleteSupplier(suppliersId).subscribe(res =>{
      this._flashMessagesService.show('Producto eliminado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
      this.resetModal();
      return this.getSuppliers();
    },
    err=> this._flashMessagesService.show('Fallo al eliminar el proveedor', { cssClass: 'alert-danger', timeout: 4000 }))
  }

  editSuppliers(supplierId:string){
    this.idSupplier = supplierId;
    this.isEdit = true;
    this.labelModal = 'Editar proveedor'
    this.supplierService.getSupplierById(supplierId).subscribe(res =>{
      this.form.patchValue(res);
    }, err=>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
      this._flashMessagesService.show('Fallo al eliminar al proveedor', { cssClass: 'alert-danger', timeout: 4000 })
    });
  }

  savedSupplierUpdate(){
    this.supplierService.saveSupplierUpdating(this.idSupplier, this.form.value).subscribe(res =>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
      this._flashMessagesService.show('proveedor editado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
      return this.getSuppliers();
    },
    err=> {
      this.buttonClose.first.nativeElement.click();
      this._flashMessagesService.show('Fallo al editar el proveedor', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }
  resetModal(){
    this.isEdit = false;
    this.idSupplier = '';
    this.labelModal = 'Crear proveedor';
    this.createForm();
}
}
