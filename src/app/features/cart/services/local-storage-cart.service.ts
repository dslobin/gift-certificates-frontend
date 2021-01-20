import {Injectable} from '@angular/core';
import {Cart} from '../../../core/models/cart';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCartService {
  private cartKey = 'cart';

  constructor() {
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  getCart(): Cart {
    let cart = JSON.parse(localStorage.getItem(this.cartKey));
    if (!cart) {
      cart = new Cart();
      this.saveCart(cart);
    }
    return cart;
  }

  saveCart(cart: Cart): void {
    localStorage.removeItem(this.cartKey);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }
}
