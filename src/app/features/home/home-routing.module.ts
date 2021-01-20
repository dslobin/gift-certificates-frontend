import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from './pages/admin-home/admin-home.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {UserRole} from '../../core/enums/user-role.enum';
import {UserRoleUtil} from '../../core/enums/user-role-util';

const routes: Routes = [
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        UserRoleUtil.toString(UserRole.ROLE_ADMIN)
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
