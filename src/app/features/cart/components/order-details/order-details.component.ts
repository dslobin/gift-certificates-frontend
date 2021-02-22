import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../../../core/models/cart-item';
import {Cart} from '../../../../core/models/cart';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CartManagerService} from '../../services/cart-manager.service';
import {MatDialog} from '@angular/material/dialog';
import {OrderConfirmationDialogComponent} from '../order-confirmation-dialog/order-confirmation-dialog.component';
import {OrderService} from '../../../../core/http/order.service';
import {Order} from '../../../../core/models/order';
import {AuthenticationService} from '../../../../core/http/authentication.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  private cart$: Observable<Cart>;

  constructor(
    private cartManager: CartManagerService,
    private orderService: OrderService,
    public authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.cart$ = this.cartManager.cart$;
  }

  ngOnInit(): void {
    this.cart$.subscribe(
      (cart) => {
        console.log(cart);
        this.cartItems = cart.cartItems;
        this.cartTotal = cart.certificatesCost;
      });
  }

  onSubmit(): void {
    this.orderService.createOrder()
      .subscribe(
        (order) => {
          console.log(order);
          this.openDialog(order);
        },
        (error) => {
          console.log(error);
        });
  }

  private openDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderConfirmationDialogComponent, {
      data: order
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/certificates']);
    });
  }

  redirectToCartPage(): void {
    this.router.navigate(['/cart']);
  }
}
