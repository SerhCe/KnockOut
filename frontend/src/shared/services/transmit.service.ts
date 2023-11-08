import { Orders, Transmit, URISTRING } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TransmitService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  public transmitUseridAndLocalConfigId(
    transmit: Transmit
  ): Observable<Transmit> {
    return this.httpClient.post<Transmit>(
      URISTRING.URI.concat(URISTRING.RECEIVEID),
      transmit,
      this.httpOptions
    );
  }
}
