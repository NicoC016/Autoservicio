import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from '../models/product.model'
import { FlashMessagesService } from 'flash-messages-angular';
import { PDFDocument, rgb } from 'pdf-lib';


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
  async generateTicket(): Promise<Uint8Array> {
    let ticketContent:any[] = [
      {text: '      Supercarrito                    ', fontSize: 18 },
      {text: '---------------------------------------------------'},
      {text: `Fecha: ${new Date().toLocaleDateString()}         Hora: ${new Date().toLocaleTimeString()}`},
      {text: '---------------------------------------------------'},
    ];
    this.products.forEach(res=>{
      ticketContent.push({ text: `${res.name}/s (${res.quantity}*${res.price})                  $${res.price * res.quantity }`});
    });

    let addTicketContent = [
      {text: ''},
      {text: '---------------------------------------------------'},
      {text: `total:                                         $${this.total}`},
      {text: '---------------------------------------------------'},
      {text: '           ¡Gracias por su visita! '                           }  
    ];

    ticketContent.push(...addTicketContent);


    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([200, 300]);
    const { width, height } = page.getSize();
    const defaultFontSize = 10;
    let yPosition = height;
    ticketContent.forEach(({ text, fontSize = defaultFontSize }) => {
        yPosition -= fontSize;
        const xPosition = (width - 170) / 2;
        page.drawText(text, {
          x: xPosition,
          y: yPosition,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
    });
    return await pdfDoc.save();
  }

  // Función para descargar el boleto térmico como PDF
  async downloadPDF() {
    const pdfBytes = await this.generateTicket();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'boleto_termico.pdf';
    link.click();
  }

}
