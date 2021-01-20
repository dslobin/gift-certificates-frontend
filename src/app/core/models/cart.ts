import {CartItem} from './cart-item';

export class Cart {
  userEmail: string;
  cartItems: CartItem[] = [];
  itemsCount: number;
  certificatesCost: number;
}
