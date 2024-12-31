import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultingPriceRoutingModule } from './consulting-price-routing.module';
import { ConsultingPriceComponent } from './components/consulting-price.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { StyleClassModule } from 'primeng/styleclass';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    ConsultingPriceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConsultingPriceRoutingModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    TagModule,
    StyleClassModule,
  ]
})
export class ConsultingPriceModule { }
