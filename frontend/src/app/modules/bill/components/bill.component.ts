import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ProductService } from '../../products/services/product.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @ViewChild('facturaContent', { static: false }) facturaContent!: ElementRef;
  @ViewChild('formAdd', { static: false }) formAdd!: ElementRef;
  @ViewChild('buttonPrint', { static: false }) buttonPrint!: ElementRef;
  public moreTaxAnt = 0
  public total = 0;
  rows: any[] = [];
  public form: FormGroup = new FormGroup({});
  
  constructor(
    private productService: ProductService,
    private formBuilder:FormBuilder, 
    public _flashMessagesService: FlashMessagesService,
    ) {}
  
  ngOnInit(): void {
    this.createForm();
  }


  createForm(){
    this.form = this.formBuilder.group({
      codebar: new FormControl(""),
      quantity:new FormControl(1),
      moreTax: new FormControl(0)
    });
  }
  generarFactura() {
    const pdf = new jsPDF('p', 'mm', 'a4');
    this.formAdd.nativeElement.style.display = 'none';
    this.buttonPrint.nativeElement.style.display = 'none';
    const options = {
      background: 'white',
      scale: 3
    };
    
    html2canvas(this.facturaContent.nativeElement, options).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      pdf.addImage(imageData, 'PNG', 10, 10, 190, 0);
      pdf.save('factura_tributaria.pdf');
    });
    this.formAdd.nativeElement.style.display = '';
    this.buttonPrint.nativeElement.style.display = '';
  }

  searchProduct(){
    this.productService.searchProduct(this.form.value.codebar).subscribe(res=>{
      this.rows.push({
        code: res.codebar,
        description: res.name,
        cant: this.form.value.quantity,
        price: res.price,
        IVA: '0',
        total: (parseInt(res.price) * parseInt(this.form.value.quantity,)).toString(),
      });
      this.actualizarTotal();
    })
  }

  actualizarTotal(): void {
    this.total = this.rows.reduce((sum, p) => sum > 0? sum + parseInt(p.total) : parseInt(p.total), 0);
  }

  removeRow=(index:any)=>{
    this.rows.splice(index, 1);
  }

  changeValueMoreTax(){
    if(this.form.value.moreTax[0] === 0)this.form.value.moreTax = this.form.value.moreTax.slice(0, 1);
    if(this.form.value.moreTax === "")this.form.value.moreTax = 0;
    let actualValue = parseInt(this.form.value.moreTax);
    this.total -= this.moreTaxAnt;
    this.total += actualValue;
    return this.moreTaxAnt = actualValue;
  }

}
