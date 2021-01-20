import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../http/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      /** Check if route is restricted by role */
      const userRoles = this.authService.getUserRoles().map(r => r.name);
      if (route.data.roles && route.data.roles.find(r => userRoles.includes(r)) == null) {
        /** Role not authorized so redirect to home page */
        console.log(`Role not authorized!`);
        this.router.navigate(['/certificates']);
        return false;
      }
      console.log(`Role authorized.`);
      /** Authorized so return true */
      return true;
    }
    console.log(`User not logged in...`);
    /** Not logged in so redirect to login page with the return url */
    this.router.navigate(['/login']);
    return false;
  }

}
