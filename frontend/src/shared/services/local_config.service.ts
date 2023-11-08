import { Local_config, URISTRING } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalConfigService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  public getLocalConfig(): Observable<Local_config[]> {
    return this.httpClient.get<Local_config[]>(
      URISTRING.URI.concat(URISTRING.LOCALCONFIG)
    );
  }

  public getLocalConfigById(id: number): Observable<Local_config> {
    return this.httpClient.get<Local_config>(
      `${URISTRING.URI.concat(URISTRING.LOCALCONFIG)}${id}`
    );
  }

  public addLocalConfig(local_config: Local_config): Observable<Local_config> {
    return this.httpClient.post<Local_config>(
      URISTRING.URI.concat(URISTRING.LOCALCONFIG),
      local_config,
      this.httpOptions
    );
  }

  public deleteLocalConfig(id: number): Observable<Local_config[]> {
    return this.httpClient.delete<Local_config[]>(
      `${URISTRING.URI.concat(URISTRING.LOCALCONFIG)}${id}`
    );
  }

  public updateLocalConfig(
    id: number,
    value: Local_config
  ): Observable<Local_config[]> {
    return this.httpClient.put<Local_config[]>(
      `${URISTRING.URI.concat(URISTRING.LOCALCONFIG)}${id}`,
      value
    );
  }
}
