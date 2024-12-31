import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'employeed', loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'bill', loadChildren: () => import('./modules/bill/bill.module').then(m => m.BillModule) },
  { path: 'client', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
  { path: 'suppliers', loadChildren: () => import('./modules/suppliers/suppliers.module').then(m => m.SuppliersModule) },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'consultingPrice', loadChildren: () => import('./modules/consulting-price/consulting-price.module').then(m => m.ConsultingPriceModule) },
  { path: 'listProducts', loadChildren: () => import('./modules/product-list/product-list.module').then(m => m.ProductListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
