import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagBaseUrl = 'http://localhost:8080/api/tags';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllTags(params: HttpParams): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(this.tagBaseUrl, {params});
  }
}
