import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../../../core/models/cart-item';
import {Cart} from '../../../../core/models/cart';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CartManagerService} from '../../services/cart-manager.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  cart$: Observable<Cart>;

  constructor(
    private router: Router,
    private cartManager: CartManagerService
  ) {
    this.cart$ = this.cartManager.cart$;
  }

  ngOnInit(): void {
    this.cart$.subscribe(
      (cart) => {
        console.log(cart);
        this.cartItems = cart.cartItems.sort((a, b) => {
          if (a.giftCertificate.name > b.giftCertificate.name) {
            return 1;
          }
          if (a.giftCertificate.name < b.giftCertificate.name) {
            return -1;
          }
          return 0;
        });
        this.cartTotal = cart.certificatesCost;
      });
  }

  redirectToOrderDetails(): void {
    this.router.navigate(['/order-details']);
  }

  redirectToCertificatesPage(): void {
    this.router.navigate(['/certificates']);
  }

  clearCartItem(cartItem: CartItem): void {
    const NO_PRODUCTS_IN_CART = 0;
    this.cartManager.addCartItem(cartItem.giftCertificate, NO_PRODUCTS_IN_CART);
  }

  private changeCartItemCount(cartItem: CartItem, step: number): void {
    const cartItemQuantity = cartItem.quantity + step;
    console.log(`Item quantity = ${cartItem.quantity},\nStep = ${step},\nNew Quantity = ${cartItemQuantity}`);
    this.cartManager.addCartItem(cartItem.giftCertificate, cartItemQuantity);
  }
}
