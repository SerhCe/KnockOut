import { Configuration, URISTRING } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  public getConfiguration(): Observable<Configuration[]> {
    return this.httpClient.get<Configuration[]>(
      URISTRING.URI.concat(URISTRING.CONFIGURATION)
    );
  }

  public getConfigurationById(id: number): Observable<Configuration> {
    return this.httpClient.get<Configuration>(
      `${URISTRING.URI.concat(URISTRING.CONFIGURATION)}${id}`
    );
  }

  public addConfiguration(
    configuration: Configuration
  ): Observable<Configuration> {
    return this.httpClient.post<Configuration>(
      URISTRING.URI.concat(URISTRING.CONFIGURATION),
      configuration,
      this.httpOptions
    );
  }

  public deleteConfiguration(id: number): Observable<Configuration[]> {
    return this.httpClient.delete<Configuration[]>(
      `${URISTRING.URI.concat(URISTRING.CONFIGURATION)}${id}`
    );
  }

  public updateConfiguration(
    id: number,
    value: Configuration
  ): Observable<Configuration[]> {
    return this.httpClient.put<Configuration[]>(
      `${URISTRING.URI.concat(URISTRING.CONFIGURATION)}${id}`,
      value
    );
  }
}
