import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {UserRoleUtil} from './core/enums/user-role-util';
import {UserRole} from './core/enums/user-role.enum';
import {NotFoundComponent} from './core/components/not-found/not-found.component';
import {ForbiddenComponent} from './core/components/forbidden/forbidden.component';
import {InternalServerErrorComponent} from './core/components/internal-server-error/internal-server-error.component';

const routes: Routes = [
  {
    path: 'admin/home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        UserRoleUtil.toString(UserRole.ROLE_ADMIN)
      ]
    }
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '500',
    component: InternalServerErrorComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
