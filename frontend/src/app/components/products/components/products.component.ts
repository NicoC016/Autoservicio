import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Product} from '../models/product.model'
import { FlashMessagesService } from 'flash-messages-angular';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Producto {
  nombre: string;
  precio: number;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public products: Product[] = [];
  public showProduct = false;
  public form: FormGroup = new FormGroup({});
  public nuevoProducto: Product = { name: '', price: 0, quantity: 0 };
  @ViewChild('productos')productos!:ElementRef;
  @ViewChild('iconDelete')iconDelete!:ElementRef;
  total: number = 0;


  constructor(
    private productService: ProductService,
    private formBuilder:FormBuilder, 
    public _flashMessagesService: FlashMessagesService,
    ) {this.createForm();}

  ngOnInit() {
    this.getProducts();
    this.showProduct = this.products.length > 0;
  }
  getProducts(){
    this.productService.getProduct().subscribe((products) => {
      this.products = products;
      this.showProduct = this.products.length > 0;
      this.actualizarTotal();
    });
  }
  createForm(){
    this.form = this.formBuilder.group({
        name:new FormControl(""),
        codebar: new FormControl(""),
        brand: new FormControl(""),
        category: new FormControl(""),
        price: new FormControl(""),
        quantity:new FormControl(1),
    });
  }

  addProduct(){
    if(this.form.value.codebar === "" ){
      return this._flashMessagesService.show('Insertar un código de barra', { cssClass: 'alert-danger', timeout: 4000 });
    }
    this.productService.searchProduct(this.form.value.codebar).subscribe(res=>{
      if(res.length > 1){
        return this._flashMessagesService.show('Insertar un código de barra', { cssClass: 'alert-danger', timeout: 4000 });
      }
      this.productService.addProduct(this.form.value).subscribe(res=>{
        this.createForm();
        this.getProducts();
      },err=>this._flashMessagesService.show('Fallo al agregar el producto', { cssClass: 'alert-danger', timeout: 4000 })
      );
    },err=>{
      return this._flashMessagesService.show('Producto no encontrado', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }
  searchProduct(){
    this.productService.searchProduct(this.form.value.codebar).subscribe(res=>{
      if(res.length > 1){
        return this._flashMessagesService.show('Insertar un código de barra', { cssClass: 'alert-danger', timeout: 4000 });
      }
      this.form.patchValue(res);
    },err=> {
      return this._flashMessagesService.show('Producto no encontrado', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }
  deleteProductList(name:string){
    const codebar = this.products.find((x)=>  x.name === name);
    this.productService.deleteProduct(codebar?.codebar).subscribe(res=>{
      this._flashMessagesService.show('Producto eliminado con éxito', { cssClass: 'alert-success', timeout: 4000 });
      this.getProducts();
    },err=>{
      this._flashMessagesService.show('No se pudo eliminar el producto seleccionado', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }

  actualizarTotal(): void {
    this.total = this.products.reduce((sum, p) => sum > 0? sum + (p.price * p.quantity) : (p.price * p.quantity), 0);
  }

  descargarTicket(): void {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    this.iconDelete.nativeElement.style.display = "none";
    
    html2canvas(this.productos.nativeElement, options).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      pdf.addImage(imageData, 'PNG', 10, 10, 190, 0);
      pdf.save('ticket.pdf');
    });
    this.iconDelete.nativeElement.style.display = "";
  }
}
