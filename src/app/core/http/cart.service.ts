import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../models/cart';
import {AddCartItem} from '../../features/cart/models/add-cart-item';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartBaseUrl = environment.cartBaseUrl;

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
