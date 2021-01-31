import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagBaseUrl = environment.tagBaseUrl;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllTags(params: HttpParams): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(this.tagBaseUrl, {params});
  }
}
