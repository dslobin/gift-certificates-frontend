import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { OrderConfirmationDialogComponent } from './components/order-confirmation-dialog/order-confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    CheckoutComponent,
    OrderConfirmationDialogComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SharedModule
  ]
})
export class CartModule {
}
