import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationModule} from './authentication/authentication.module';
import {CertificatesModule} from './certificates/certificates.module';
import {CartModule} from './cart/cart.module';
import {HomeModule} from './home/home.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationModule,
    CertificatesModule,
    CartModule,
    HomeModule,
  ]
})
export class FeaturesModule {
}
