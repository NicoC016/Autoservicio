import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlashMessagesModule } from 'flash-messages-angular';

//primeNG
import {MenubarModule} from 'primeng/menubar'
import {StyleClassModule} from 'primeng/styleclass'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

//module of components
import { EmployeeModule } from './components/employee/employee.module';
import { HomeModule } from './components/home/home.module';
import { BillModule } from './components/bill/bill.module';
import { ProductsModule } from './components/products/products.module';
import { LoginModule } from './components/login/login.module';
import { ClientModule } from './components/client/client.module';
import { SuppliersModule } from './components/suppliers/suppliers.module';
import { NavbarComponent } from './extra/navbar/components/navbar.component';
import { ConsultingPriceModule } from './components/consulting-price/consulting-price.module';
import { ProductListModule } from './components/product-list/product-list.module';
;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    StyleClassModule,
    InputTextModule,
    ButtonModule,
    HomeModule,
    EmployeeModule,
    BillModule,
    LoginModule,
    ProductsModule,
    ClientModule,
    SuppliersModule,
    ConsultingPriceModule,
    ProductListModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
