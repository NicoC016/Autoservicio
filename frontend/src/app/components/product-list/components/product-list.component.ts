import { Component, ViewChildren } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductListService } from '../productListService/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @ViewChildren('buttonClose') buttonClose!:any;
  public products!:any[];
  public layout: string = 'list';
  public showProducts = false;
  public form:FormGroup = new FormGroup({});
  public labelModal = 'Agregar producto';
  public idSupplier = '';
  public isEdit = false;
  public userLogged = { 
    role: '',
  };

  constructor(
    public productListService:ProductListService,
    public _flashMessagesService:FlashMessagesService,
    public formBuilder: FormBuilder,
  ){}
  ngOnInit(): void {
    this.searchProduct();
    this.createForm();
    //@ts-ignore
    this.userLogged =  JSON.parse(localStorage.getItem('userData'));
  }

  createForm(){
    this.form = this.formBuilder.group({
        name: new FormControl(""),
        brand: new FormControl(""),
        category: new FormControl(""),
        codebar: new FormControl(""),
        image: new FormControl(""),
        price: new FormControl(""),
        weight: new FormControl(""),
        unity: new FormControl(""),
    });
  }

  searchProduct(){
    this.products = [];
    this.showProducts = false;
    this.productListService.getAllProduct().subscribe(res=>{
      if(res){
        this.products = res;
        this.showProducts = true;
      }
    },err=> {
      return this._flashMessagesService.show('Producto no encontrado', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }

  createNewProduct(){
    this.productListService.createProduct(this.form.value).subscribe(res =>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
      this._flashMessagesService.show('Producto agregado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
      this.searchProduct();
    },
    err=>this._flashMessagesService.show('Error al crear el producto', { cssClass: 'alert-danger', timeout: 4000 }))
  }
  saveProduct(){
    if(this.isEdit)return this.savedProductUpdate();
    this.createNewProduct();
  }

  deleteProduct(suppliersId:string){
      this.productListService.deleteProduct(suppliersId).subscribe(res =>{
        this._flashMessagesService.show('Producto eliminado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
        return this.searchProduct();
      },
      err=> this._flashMessagesService.show('Fallo al eliminar el producto', { cssClass: 'alert-danger', timeout: 4000 }))
  }

  editProduct(supplierId:string){
    this.idSupplier = supplierId;
    this.isEdit = true;
    this.labelModal = 'Editar producto'
    this.productListService.getProductById(supplierId).subscribe(res =>{
      this.form.patchValue(res);
    }, err=>{
      this.resetModal();
      this.buttonClose.first.nativeElement.click();
      this._flashMessagesService.show('Fallo al eliminar el producto', { cssClass: 'alert-danger', timeout: 4000 })
    });
  }

  savedProductUpdate(){
    this.productListService.PutProduct(this.idSupplier, this.form.value).subscribe(res =>{
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
      this._flashMessagesService.show('Producto editado exitosamente', { cssClass: 'alert-success', timeout: 4000 });
      return this.searchProduct();
    },
    err=> {
      this.buttonClose.first.nativeElement.click();
      this.resetModal();
      this._flashMessagesService.show('Fallo al editar el producto', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }

  resetModal(){
      this.isEdit = false;
      this.idSupplier = '';
      this.labelModal = 'Crear producto';
      this.createForm();
  }
}
