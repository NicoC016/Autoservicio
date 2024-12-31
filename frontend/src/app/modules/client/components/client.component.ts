import { Component, ViewChildren } from '@angular/core';
import { ClienteService } from '../services/client.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  @ViewChildren('buttonClose') buttonClose!:any;
  public clients!: any;
  public form : FormGroup = new FormGroup({});
  public first = 0;
  public labelModal = 'Agregar cliente';
  public idSupplier = '';
  public isEdit = false;
  public rows = 10;

  constructor(
    private clientServices: ClienteService,
    public formBuilder:FormBuilder,
    public _flashMessagesService:FlashMessagesService,
    ) {}

  ngOnInit() {
    this.createForm();
    this.getClient();
  }

  getClient(){
    this.clientServices.getClient().subscribe(res=>{
      return this.clients = res;
  });
  }
  createForm(){
    this.form = this.formBuilder.group({
        name: new FormControl(""),
        lastName: new FormControl(""),
        identification: new FormControl(""),
        cuil: new FormControl(""),
        city: new FormControl(""),
        phoneNumber: new FormControl(""),
        birthdate: new FormControl(""),
    });
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
      return this.clients ? this.first === this.clients.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.clients ? this.first === 0 : true;
  }

  createNewClient(){
    this.clientServices.createClient(this.form.value).subscribe(res =>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
      this._flashMessagesService.show('Empleado agregado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
      this.getClient();
    },
    err=>this._flashMessagesService.show('Error al crear el cliente', { cssClass: 'alert-danger', timeout: 4000 }))
  }
  saveClient(){
    if(this.isEdit)return this.savedClientUpdate();
    this.createNewClient();
  }

  deleteClient(suppliersId:string){
      this.clientServices.deleteClient(suppliersId).subscribe(res =>{
        this._flashMessagesService.show('Cliente eliminado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
        return this.getClient();
      },
      err=> this._flashMessagesService.show('Fallo al eliminar el cliente', { cssClass: 'alert-danger', timeout: 4000 }))
  }

  editClient(supplierId:string){
    this.idSupplier = supplierId;
    this.isEdit = true;
    this.labelModal = 'Editar cliente'
    this.clientServices.getClientById(supplierId).subscribe(res =>{
      this.form.patchValue(res);
    }, err=>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
      this._flashMessagesService.show('Fallo al eliminar el cliente', { cssClass: 'alert-danger', timeout: 4000 })
    });
  }

  savedClientUpdate(){
    this.clientServices.PutClient(this.idSupplier, this.form.value).subscribe(res =>{
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
      this._flashMessagesService.show('Cliente editado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
      return this.getClient();
    },
    err=> {
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
      this._flashMessagesService.show('Fallo al editar el cliente', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }

  resetModal(){
      this.isEdit = false;
      this.idSupplier = '';
      this.labelModal = 'Crear cliente';
      this.createForm();
  }
}
