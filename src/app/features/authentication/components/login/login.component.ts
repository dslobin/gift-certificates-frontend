import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../core/http/authentication.service';
import {LoginRequest} from '../../models/login-request';
import {Role} from '../../../../core/models/role';
import {UserRole} from '../../../../core/enums/user-role.enum';
import {map} from 'rxjs/operators';
import {CartService} from '../../../../core/http/cart.service';
import {LocalStorageCartService} from '../../../cart/services/local-storage-cart.service';
import {CartManagerService} from '../../../cart/services/cart-manager.service';
import {LoginResponse} from '../../models/login-response';
import {UserRoleUtil} from '../../../../core/enums/user-role-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  badCredentials: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private cartService: CartService,
    private localStorageCartService: LocalStorageCartService,
    private cartManager: CartManagerService,
  ) {
    /** Redirect to home if already logged in */
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/certificates']);
    }
  }

  private static redirectUser(roles: Role[]): string {
    const userRoleNames = roles.map(r => r.name);
    if (userRoleNames.includes(UserRoleUtil.toString(UserRole.ROLE_ADMIN))) {
      return 'admin/home';
    } else if (userRoleNames.includes(UserRoleUtil.toString(UserRole.ROLE_USER))) {
      return 'certificates';
    }
    return 'certificates';
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    const loginRequest: LoginRequest = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(loginRequest).pipe(
      map((loginResponse) => {
        this.badCredentials = false;
        this.saveUserInformation(loginResponse);
        return loginResponse;
      })
    ).subscribe(
      (user) => {
        if (this.authService.hasAnyRole([
          UserRoleUtil.toString(UserRole.ROLE_USER)
        ])) {
          this.syncUserCart();
        }
        const returnUrl = LoginComponent.redirectUser(user.roles);
        this.router.navigateByUrl(returnUrl);
      }
    );
  }

  private saveUserInformation(user: LoginResponse): void {
    this.authService.saveLogin(user.login);
    this.authService.saveToken(user.token);
    this.authService.saveUserRoles(user.roles);
  }

  private syncUserCart(): void {
    const cart = this.localStorageCartService.getCart();
    const cartItems = cart.cartItems;
    if (cartItems.length > 0) {
      cartItems.forEach(item => this.cartManager.addCartItem(item.giftCertificate, item.quantity));
      this.localStorageCartService.clearCart();
    }
  }
}
