import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './components/bill.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../products/services/product.service';


@NgModule({
  declarations: [BillComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ProductService]
})
export class BillModule { }
