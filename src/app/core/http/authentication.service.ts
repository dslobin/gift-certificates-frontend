import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../features/authentication/models/login-request';
import {LoginResponse} from '../../features/authentication/models/login-response';
import {Observable} from 'rxjs';
import {SignUpRequest} from '../../features/authentication/models/sign-up-request';
import {User} from '../models/user';
import {Role} from '../models/role';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authBaseUrl = environment.authBaseUrl;
  private TOKEN_KEY = 'auth-token';
  private LOGIN_KEY = 'user-login';
  private ROLES_KEY = 'user-roles';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  signUp(signUpRequest: SignUpRequest): Observable<User> {
    return this.httpClient.post<User>(`${this.authBaseUrl}/sign-up`, signUpRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.authBaseUrl}/login`, loginRequest);
  }

  logout(): void {
    localStorage.clear();
  }

  public hasAnyRole(roles: string[]): boolean {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }
    const userRoleNames = this.getUserRoles().map(r => r.name);

    const result = roles.find(r => userRoleNames.includes(r)) != null;
    // console.log(`User roles: ${userRoleNames},\nParameter roles: ${roles},\nHas any role result: ${result}`);
    return result;
  }

  public hasRole(role: string): boolean {
    if (!role) {
      throw new Error('Role value is empty or missed');
    }
    const userRoleNames = this.getUserRoles().map(r => r.name);

    const result = userRoleNames.includes(role);
    // console.log(`User roles: ${userRoleNames},\nParameter role: ${role},\nHas role result: ${result}`);
    return result;
  }

  public saveToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveLogin(login: string): void {
    localStorage.removeItem(this.LOGIN_KEY);
    localStorage.setItem(this.LOGIN_KEY, login);
  }

  public getLogin(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveUserRoles(roles: Role[]): void {
    localStorage.removeItem(this.ROLES_KEY);
    localStorage.setItem(this.ROLES_KEY, JSON.stringify(roles));
  }

  public getUserRoles(): Role[] {
    const roles = localStorage.getItem(this.ROLES_KEY);
    if (roles) {
      return JSON.parse(roles);
    }
    return [];
  }

  public isLoggedIn(): boolean {
    return this.getToken() != null;
  }
}
