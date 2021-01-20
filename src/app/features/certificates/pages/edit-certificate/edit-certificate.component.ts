import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GiftCertificateService} from '../../../../core/http/gift-certificate.service';
import {Tag} from '../../../../core/models/tag';
import {GiftCertificate} from '../../../../core/models/gift-certificate';

@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.scss']
})
export class EditCertificateComponent implements OnInit {
  certificateForm: FormGroup;
  tags: string[] = [];
  tagName: string;
  private certificateId: number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private giftCertificateService: GiftCertificateService
  ) {
  }

  ngOnInit(): void {
    this.certificateForm = this.formBuilder.group({
      id: ['', Validators.nullValidator],
      name: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.nullValidator],
    });

    this.certificateId = this.activatedRoute.snapshot.params.id;

    this.giftCertificateService.getCertificateById(this.certificateId)
      .subscribe(
        (certificate) => {
          console.log(certificate);
          this.certificateForm.patchValue({
            id: certificate.id,
            name: certificate.name,
            price: certificate.price,
            duration: certificate.durationInDays,
            description: certificate.description,
          });
          this.tags = certificate.tags.map(tag => tag.name);
        },
        (error) => {
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

  onSubmit(): void {
    const certificateTags = this.tags.map(tagName => {
      const tag = new Tag();
      tag.name = tagName;
      return tag;
    });

    const giftCertificate: GiftCertificate = {
      id: this.certificateForm.get('id').value,
      name: this.certificateForm.get('name').value,
      description: this.certificateForm.get('description').value,
      price: this.certificateForm.get('price').value,
      durationInDays: this.certificateForm.get('duration').value,
      createDate: null,
      lastUpdateDate: null,
      tags: certificateTags
    };
    console.log(giftCertificate);
    this.giftCertificateService.updateCertificate(giftCertificate).subscribe(certificate => {
      console.log(certificate);
      this.router.navigateByUrl('/certificates');
    }, error => {
      console.log(error);
    });
  }

  redirectToAllCertificates(): void {
    this.router.navigateByUrl(`/certificates`);
  }
}
