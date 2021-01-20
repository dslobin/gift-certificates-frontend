import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GiftCertificate} from '../models/gift-certificate';

@Injectable({
  providedIn: 'root'
})
export class GiftCertificateService {
  private certificateBaseUrl = 'http://localhost:8080/api/certificates';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllCertificates(params: HttpParams): Observable<GiftCertificate[]> {
    return this.httpClient.get<GiftCertificate[]>(this.certificateBaseUrl, {params});
  }

  getCertificateById(certificateId: number): Observable<GiftCertificate> {
    return this.httpClient.get<GiftCertificate>(this.certificateBaseUrl + `/${certificateId}`);
  }

  createCertificate(certificate: GiftCertificate): Observable<GiftCertificate> {
    return this.httpClient.post<GiftCertificate>(this.certificateBaseUrl, certificate);
  }

  updateCertificate(certificate: GiftCertificate): Observable<GiftCertificate> {
    return this.httpClient.put<GiftCertificate>(this.certificateBaseUrl, certificate);
  }
}
