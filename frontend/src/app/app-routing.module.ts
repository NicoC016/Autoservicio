import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'employeed', loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'bill', loadChildren: () => import('./components/bill/bill.module').then(m => m.BillModule) },
  { path: 'client', loadChildren: () => import('./components/client/client.module').then(m => m.ClientModule) },
  { path: 'suppliers', loadChildren: () => import('./components/suppliers/suppliers.module').then(m => m.SuppliersModule) },
  { path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule) },
  { path: 'consultingPrice', loadChildren: () => import('./components/consulting-price/consulting-price.module').then(m => m.ConsultingPriceModule) },
  { path: 'listProducts', loadChildren: () => import('./components/product-list/product-list.module').then(m => m.ProductListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
