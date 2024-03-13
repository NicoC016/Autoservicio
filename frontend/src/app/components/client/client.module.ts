import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './components/client.component';
import { ClienteService } from './services/client.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers:[ClienteService],
})
export class ClientModule { }
