import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './components/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { ProductListService } from './productListService/product-list.service';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductListRoutingModule,
    DataViewModule,
    TagModule,
    StyleClassModule,
    ButtonModule,
    InputTextModule,

  ],
  providers:[ProductListService],
})
export class ProductListModule { }
