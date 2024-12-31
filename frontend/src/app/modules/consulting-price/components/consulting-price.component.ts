import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../products/services/product.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-consulting-price',
  templateUrl: './consulting-price.component.html',
  styleUrls: ['./consulting-price.component.scss']
})
export class ConsultingPriceComponent {
  form:FormGroup = new FormGroup({});
  public products!:any[];
  public layout: string = 'list';
  public showProducts = false;

  constructor(
    public formBuilder:FormBuilder,
    public productService:ProductService,
    public _flashMessagesService:FlashMessagesService
  ){}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
        codebar: new FormControl(""),
    });
  }

  searchProduct(){
    this.products = [];
    this.showProducts = false;
    this.productService.searchProduct(this.form.value.codebar).subscribe(res=>{
      if(res){
        this.products.push(res);
        this.showProducts = true;
      }
    },err=> {
      return this._flashMessagesService.show('Producto no encontrado', { cssClass: 'alert-danger', timeout: 4000 });
    })
  }
}
