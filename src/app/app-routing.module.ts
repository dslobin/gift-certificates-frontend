import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {UserRoleUtil} from './core/enums/user-role-util';
import {UserRole} from './core/enums/user-role.enum';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
