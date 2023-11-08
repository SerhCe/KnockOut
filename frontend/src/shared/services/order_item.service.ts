import { Order_item, URISTRING } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderItemService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  public getOrderItem(): Observable<Order_item[]> {
    return this.httpClient.get<Order_item[]>(
      URISTRING.URI.concat(URISTRING.ORDERITEM)
    );
  }

  public getOrderItemById(id: number): Observable<Order_item> {
    return this.httpClient.get<Order_item>(
      `${URISTRING.URI.concat(URISTRING.ORDERITEM)}${id}`
    );
  }

  public addOrderItem(order_item: Order_item): Observable<Order_item> {
    return this.httpClient.post<Order_item>(
      URISTRING.URI.concat(URISTRING.ORDERITEM),
      order_item,
      this.httpOptions
    );
  }

  public deleteOrderItem(id: number): Observable<Order_item[]> {
    return this.httpClient.delete<Order_item[]>(
      `${URISTRING.URI.concat(URISTRING.ORDERITEM)}${id}`
    );
  }

  public updateOrderItem(
    id: number,
    value: Order_item
  ): Observable<Order_item[]> {
    return this.httpClient.put<Order_item[]>(
      `${URISTRING.URI.concat(URISTRING.ORDERITEM)}${id}`,
      value
    );
  }
}
