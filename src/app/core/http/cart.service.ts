import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../models/cart';
import {AddCartItem} from '../../features/cart/models/add-cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartBaseUrl = 'http://localhost:8080/api/cart';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getCart(): Observable<Cart> {
    return this.httpClient.get<Cart>(this.cartBaseUrl);
  }

  addItem(cartItem: AddCartItem): Observable<Cart> {
    console.log('Adding cart item in cart service...');
    return this.httpClient.put<Cart>(`${this.cartBaseUrl}`, cartItem);
  }

  clearCart(): Observable<Cart> {
    return this.httpClient.delete<Cart>(this.cartBaseUrl);
  }
}
