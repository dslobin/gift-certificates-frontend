import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
