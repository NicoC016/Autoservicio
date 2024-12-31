import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultingPriceComponent } from './components/consulting-price.component';

const routes: Routes = [
  {
    path:'',
    component: ConsultingPriceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultingPriceRoutingModule { }
