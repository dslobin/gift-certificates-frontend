import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthenticationService} from '../../http/authentication.service';
import {CartManagerService} from '../../../features/cart/services/cart-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  cartItemsCount = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,
    private cartManager: CartManagerService,
  ) {
  }

  ngOnInit(): void {
    /*this.cartManager.cartSubject.subscribe(
      (cart) => {
        const cartItems = cart.cartItems;
        this.cartItemsCount = cartItems.length;
      }
    );*/
  }
}
