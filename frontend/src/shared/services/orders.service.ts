import { Orders, URISTRING } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  public getOrders(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>(
      URISTRING.URI.concat(URISTRING.ORDERS)
    );
  }

  public getOrdersById(id: number): Observable<Orders> {
    return this.httpClient.get<Orders>(
      `${URISTRING.URI.concat(URISTRING.ORDERS)}${id}`
    );
  }

  public addOrders(orders: Orders): Observable<Orders> {
    return this.httpClient.post<Orders>(
      URISTRING.URI.concat(URISTRING.ORDERS),
      orders,
      this.httpOptions
    );
  }

  public deleteOrders(id: number): Observable<Orders[]> {
    return this.httpClient.delete<Orders[]>(
      `${URISTRING.URI.concat(URISTRING.ORDERS)}${id}`
    );
  }

  public updateOrders(id: number, value: Orders): Observable<Orders[]> {
    return this.httpClient.put<Orders[]>(
      `${URISTRING.URI.concat(URISTRING.ORDERS)}${id}`,
      value
    );
  }

  public transmitToWebshop(orders: Orders): Observable<Orders> {
    return this.httpClient.post<Orders>(
      URISTRING.URI.concat(URISTRING.TRANSMITTOWEBSHOP),
      orders,
      this.httpOptions
    );
  }
}
