import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {OrderDetailsComponent} from './pages/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CheckoutComponent
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
