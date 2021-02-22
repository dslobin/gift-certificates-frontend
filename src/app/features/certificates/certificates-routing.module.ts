import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CertificateListComponent} from './components/certificate-list/certificate-list.component';
import {NewCertificateComponent} from './components/new-certificate/new-certificate.component';
import {CertificateDetailsComponent} from './components/certificate-details/certificate-details.component';
import {EditCertificateComponent} from './components/edit-certificate/edit-certificate.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {UserRole} from '../../core/enums/user-role.enum';
import {UserRoleUtil} from '../../core/enums/user-role-util';

const routes: Routes = [
  {
    path: 'certificates',
    component: CertificateListComponent
  },
  {
    path: 'certificates/new',
    component: NewCertificateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        UserRoleUtil.toString(UserRole.ROLE_ADMIN)
      ]
    }
  },
  {
    path: 'certificates/:id',
    component: CertificateDetailsComponent
  },
  {
    path: 'certificates/:id/edit',
    component: EditCertificateComponent,
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
export class CertificatesRoutingModule {
}
