import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderBaseUrl = environment.orderBaseUrl;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllUserOrders(params: HttpParams): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.orderBaseUrl, {params});
  }

  getUserOrder(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(this.orderBaseUrl + `/${orderId}`);
  }

  createOrder(): Observable<Order> {
    return this.httpClient.post<Order>(`${this.orderBaseUrl}/payment`, null);
  }
}
