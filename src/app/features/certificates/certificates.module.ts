import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CertificatesRoutingModule} from './certificates-routing.module';
import {CertificateListComponent} from './pages/certificate-list/certificate-list.component';
import {CertificateDetailsComponent} from './pages/certificate-details/certificate-details.component';
import {NewCertificateComponent} from './pages/new-certificate/new-certificate.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../shared/shared.module';
import {EditCertificateComponent} from './pages/edit-certificate/edit-certificate.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    CertificateListComponent,
    CertificateDetailsComponent,
    NewCertificateComponent,
    EditCertificateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CertificatesRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ]
})
export class CertificatesModule {
}
