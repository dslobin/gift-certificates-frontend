import {Pipe, PipeTransform} from '@angular/core';
import {CartManagerService} from '../../features/cart/services/cart-manager.service';
import {CartItem} from '../../core/models/cart-item';

@Pipe({
  name: 'itemCost'
})
export class ItemCostPipe implements PipeTransform {

  constructor(
    private cartManager: CartManagerService,
  ) {
  }

  transform(cartItem: CartItem, ...args: any[]): number {
    return this.cartManager.calculateItemCost(cartItem);
  }

}
