import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Tag} from '../../../../core/models/tag';
import {GiftCertificateService} from '../../../../core/http/gift-certificate.service';
import {GiftCertificate} from '../../../../core/models/gift-certificate';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent implements OnInit {
  certificateForm: FormGroup;
  tags: string[] = [];
  tagName: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private giftCertificateService: GiftCertificateService,
  ) {
  }

  ngOnInit(): void {
    this.certificateForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.nullValidator],
    });
  }

  onSubmit(): void {
    const certificateTags = this.tags.map(tagName => {
      const tag = new Tag();
      tag.name = tagName;
      return tag;
    });

    const giftCertificate: GiftCertificate = {
      id: null,
      name: this.certificateForm.get('name').value,
      description: this.certificateForm.get('description').value,
      price: this.certificateForm.get('price').value,
      durationInDays: this.certificateForm.get('duration').value,
      createDate: null,
      lastUpdateDate: null,
      tags: certificateTags
    };
    console.log(giftCertificate);
    this.giftCertificateService.createCertificate(giftCertificate).subscribe(certificate => {
      console.log(certificate);
      this.router.navigateByUrl('/certificates');
    }, error => {
      console.log(error);
    });
  }

  addCertificateCategory(): void {
    this.tags.push(this.tagName);
    this.tagName = '';
  }

  deleteCertificateCategory(tagName: any): void {
    this.tags = this.tags.filter(t => t !== tagName);
  }

  redirectToAllCertificates(): void {
    this.router.navigateByUrl(`/certificates`);
  }
}
