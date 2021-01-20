import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderBaseUrl = 'http://localhost:8080/api/orders';

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
