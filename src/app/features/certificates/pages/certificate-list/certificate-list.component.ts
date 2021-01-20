import {Component, OnInit} from '@angular/core';
import {GiftCertificate} from '../../../../core/models/gift-certificate';
import {GiftCertificateService} from '../../../../core/http/gift-certificate.service';
import {HttpParams} from '@angular/common/http';
import {TagService} from '../../../../core/http/tag.service';
import {Tag} from '../../../../core/models/tag';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CartManagerService} from '../../../cart/services/cart-manager.service';
import {AuthenticationService} from '../../../../core/http/authentication.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {
  searchForm: FormGroup;

  /** Gift certificate data */
  searchedTags: string[] = [];
  certificateName = '';
  certificates: GiftCertificate[] = [];

  /** Tag data */
  selectTags$: Observable<Tag[]>;

  /** Pagination settings */
  certificatesStartPage: number;
  certificatesPerPage: number;
  tagsStartPage: number;
  tagsPerPage: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private certificateService: GiftCertificateService,
    private tagService: TagService,
    private cartManager: CartManagerService,
    public authService: AuthenticationService,
  ) {
    this.certificatesStartPage = 1;
    this.certificatesPerPage = 40;
    this.tagsStartPage = 1;
    this.tagsPerPage = 40;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      categories: ['', Validators.nullValidator],
      name: ['', Validators.nullValidator],
    });

    this.setSearchParameters();

    this.retrieveGiftCertificates();

    this.selectTags$ = this.retrieveTags();
  }

  showMoreCertificates(): void {
    this.certificatesPerPage = Number(this.certificatesPerPage) + 40;
    this.retrieveGiftCertificates();
  }

  private retrieveGiftCertificates(): void {
    const params = this.getCertificateRequestParams(
      this.certificateName,
      this.searchedTags,
      this.certificatesStartPage,
      this.certificatesPerPage
    );
    this.certificateService.getAllCertificates(params)
      .subscribe(
        (certificates) => {
          this.certificates = certificates;
        },
        (error) => {
          console.log(error);
        });
  }

  onSubmit(): void {
    this.certificateName = this.searchForm.get('name').value;
    this.searchedTags = this.searchForm.get('categories').value;
    this.saveSearchParameters();
    this.retrieveGiftCertificates();
  }

  private retrieveTags(): Observable<Tag[]> {
    const params = this.getTagRequestParams(
      this.certificatesStartPage,
      this.tagsPerPage
    );
    return this.tagService.getAllTags(params).pipe(
      map(tags => tags.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }))
    );
  }

  private getTagRequestParams(
    page: number,
    pageSize: number
  ): HttpParams {
    let params: HttpParams = new HttpParams();
    if (page) {
      // console.log(`Tag page: ${page}`);
      page = page - 1;
      params = params.append('page', page.toString());
    }
    if (pageSize) {
      // console.log(`Tag page size: ${pageSize}`);
      params = params.append('size', pageSize.toString());
    }
    return params;
  }

  private getCertificateRequestParams(
    certificateName: string,
    tags: string[],
    page: number,
    pageSize: number
  ): HttpParams {
    let params: HttpParams = new HttpParams();
    if (certificateName) {
      params = params.append('name', certificateName);
    }
    if (tags.length > 0) {
      params = params.append(`tags`, tags.join(', '));
    }
    if (page) {
      page = page - 1;
      params = params.append('page', page.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    return params;
  }

  addCertificateToCart(certificate: GiftCertificate, quantity: number): void {
    this.cartManager.addCartItem(certificate, quantity);
  }

  redirectToCertificateDetails(certificateId: number): void {
    this.router.navigateByUrl(`/certificates/${certificateId}`);
  }

  redirectToNewCertificate(): void {
    this.router.navigateByUrl(`/certificates/new`);
  }

  isSearchFormEmpty(): boolean {
    return (this.certificateName == null || this.certificateName === '') &&
      this.searchedTags.length === 0;
  }

  clearSearchParameters(): void {
    this.searchedTags = [];
    this.certificateName = '';
    this.searchForm.patchValue({
      categories: this.searchedTags,
      name: this.certificateName
    });
    localStorage.removeItem('searchedCategories');
    localStorage.removeItem('searchedCertificate');
    this.retrieveGiftCertificates();
  }

  private setSearchParameters(): void {
    this.searchedTags = JSON.parse(localStorage.getItem('searchedCategories')) || [];
    this.certificateName = localStorage.getItem('searchedCertificate');
    this.searchForm.patchValue({
      categories: this.searchedTags,
      name: this.certificateName
    });
  }

  private saveSearchParameters(): void {
    if (this.searchedTags.length > 0) {
      localStorage.removeItem('searchedCategories');
      localStorage.setItem('searchedCategories', JSON.stringify(this.searchedTags));
    }
    if (this.certificateName) {
      localStorage.removeItem('searchedCertificate');
      localStorage.setItem('searchedCertificate', this.certificateName);
    }
  }
}
