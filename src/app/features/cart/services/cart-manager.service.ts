import {Injectable} from '@angular/core';
import {CartService} from '../../../core/http/cart.service';
import {mergeMap} from 'rxjs/operators';
import {AddCartItem} from '../models/add-cart-item';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Cart} from '../../../core/models/cart';
import {AuthenticationService} from '../../../core/http/authentication.service';
import {LocalStorageCartService} from './local-storage-cart.service';
import {GiftCertificate} from '../../../core/models/gift-certificate';
import {CartItem} from '../../../core/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartManagerService {
  private userCart$ = new BehaviorSubject<Cart>(new Cart());

  constructor(
    private cartService: CartService,
    private localStorageCartService: LocalStorageCartService,
    private authService: AuthenticationService
  ) {
    this.getCartOrCreate();
  }

  get cart$(): Observable<Cart> {
    this.getCartOrCreate();
    return this.userCart$.asObservable();
  }

  private getCartOrCreate(): void {
    let cart$: Observable<Cart>;
    if (this.authService.isLoggedIn()) {
      console.log(`Database cart was selected.`);
      cart$ = this.cartService.getCart();
    } else {
      console.log(`Local storage cart was selected.`);
      cart$ = of(this.localStorageCartService.getCart());
    }
    cart$.subscribe((updatedCart) =>  {
      console.log(updatedCart);
      this.userCart$.next(updatedCart);
    });
  }

  addCartItem(certificate: GiftCertificate, quantity: number): void {
    if (this.authService.isLoggedIn()) {
      this.saveCartItemInDatabase(certificate, quantity);
    } else {
      this.saveCartItemInLocalStorage(certificate, quantity);
    }
  }

  calculateItemCost(cartItem: CartItem): number {
    const price = cartItem.giftCertificate.price;
    const quantity = cartItem.quantity;
    return price * quantity;
  }

  calculateCartTotal(cartItems: CartItem[]): number {
    let total = 0;
    cartItems.forEach(item => {
      total += this.calculateItemCost(item);
    });
    return total;
  }

  private updateCart(cart: Cart, certificate: GiftCertificate, newQuantity: number): void {
    if (certificate == null) {
      return;
    }

    if (newQuantity > 0) {
      const existedItem: CartItem = this.findCartItemById(cart, certificate.id);
      if (existedItem == null) {
        const newCartItem = {giftCertificate: certificate, quantity: newQuantity};
        cart.cartItems.push(newCartItem);
        console.log(`The certificate(id = ${certificate.id}) has been added to the cart`);
      } else {
        console.log(`The number of certificates(id = ${certificate.id}) has been renewed. New quantity: ${newQuantity}`);
        existedItem.quantity = newQuantity;
      }
    } else {
      console.log(`The certificate(id = ${certificate.id}) has been removed from the cart`);
      this.removeCartItem(cart, certificate.id);
    }

    const itemsCost: number = this.calculateCartTotal(cart.cartItems);
    cart.certificatesCost = itemsCost;
    const itemsCount: number = this.getItemsCount(cart);
    cart.itemsCount = itemsCount;
  }

  private findCartItemById(cart: Cart, certificateId: number): CartItem {
    const cartItems = cart.cartItems;
    return cartItems.find(item => item.giftCertificate.id === certificateId);
  }

  private removeCartItem(cart: Cart, certificateId: number): void {
    const cartItems = cart.cartItems;
    cart.cartItems = cartItems.filter(item => item.giftCertificate.id !== certificateId);
  }

  private getItemsCount(cart: Cart): number {
    return cart.cartItems.length;
  }

  private saveCartItemInLocalStorage(giftCertificate: GiftCertificate, quantity: number): void {
    const cart: Cart = this.localStorageCartService.getCart();
    this.updateCart(cart, giftCertificate, quantity);
    this.localStorageCartService.clearCart();
    this.localStorageCartService.saveCart(cart);
    console.log(cart);
    const cart$ = of(cart);
    cart$.subscribe(updatedCart => this.userCart$.next(updatedCart));
  }

  private saveCartItemInDatabase(certificate: GiftCertificate, newQuantity: number): void {
    this.cartService.getCart().pipe(
      mergeMap((cart) => {
        this.updateCart(cart, certificate, newQuantity);
        const certificateId = certificate.id;
        let quantity;
        if (newQuantity === 0) {
          quantity = newQuantity;
        } else {
          const cartItem = this.findCartItemById(cart, certificate.id);
          quantity = cartItem.quantity;
        }
        const newCartItem: AddCartItem = {certificateId, quantity};
        console.log(`${newCartItem}`);
        return this.cartService.addItem(newCartItem);
      })
    ).subscribe(
      (cart) => {
        console.log(cart);
        this.userCart$.next(cart);
      }
    );
  }
}
