import {Component, OnInit} from '@angular/core';
import {GiftCertificateService} from '../../../../core/http/gift-certificate.service';
import {GiftCertificate} from '../../../../core/models/gift-certificate';
import {ActivatedRoute, Router} from '@angular/router';
import {CartManagerService} from '../../../cart/services/cart-manager.service';
import {AuthenticationService} from '../../../../core/http/authentication.service';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {
  certificate: GiftCertificate;
  certificateId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private certificateService: GiftCertificateService,
    private cartManager: CartManagerService,
    public authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.certificateId = this.activatedRoute.snapshot.params.id;
    this.certificateService.getCertificateById(this.certificateId)
      .subscribe(
        (certificate) => {
          console.log(certificate);
          this.certificate = certificate;
        },
        (error) => {
          console.log(error);
        });
  }

  addCertificateToCart(certificate: GiftCertificate, quantity: number): void {
    this.cartManager.addCartItem(certificate, quantity);
  }

  redirectToEditCertificatePage(certificateId: number): void {
    this.router.navigateByUrl(`certificates/${certificateId}/edit`);
  }
}
