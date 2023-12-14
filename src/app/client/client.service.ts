import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './interfaces/client';

import { environment } from '../../environments/environment';


const AUTH_API = environment.linkBackend + '/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getUserClients(page: number, rows: number,
    id?: number,
    name?: string,
    surname?: string,
    identificationNumber?: string
    ): Observable<Client[]> {
      let queryParams = new HttpParams();
      if (id) {
        queryParams = queryParams.append("id", id);
      }
      if (name) {
        queryParams = queryParams.append("name", name);
      }
      if (surname) {
        queryParams = queryParams.append("surname", surname);
      }
      if (identificationNumber) {
        queryParams = queryParams.append("identificationNumber", identificationNumber);
      }

      return this.http.get<Client[]>(AUTH_API + 'clients/page/' + page + '/rows/' + rows, { params:queryParams, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getUserClientsRowCount(
    id?: number,
    name?: string,
    surname?: string,
    identificationNumber?: string
    ): Observable<number> {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append("id", id);
    }
    if (name) {
      queryParams = queryParams.append("name", name);
    }
    if (surname) {
      queryParams = queryParams.append("surname", surname);
    }
    if (identificationNumber) {
      queryParams = queryParams.append("identificationNumber", identificationNumber);
    }

    return this.http.get<number>(AUTH_API + 'clients/row-count', { params:queryParams, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  saveUserClient(client: Client): Observable<Client> {
    return this.http.post<Client>(AUTH_API.concat('client'), client, httpOptions);
  }

  deleteUserClient(clientId: number): Observable<boolean> {
    return this.http.delete<boolean>(AUTH_API + 'client/' + clientId, httpOptions);
  }

  bulkDeleteClient(arrayClientId: number[]): Observable<Client[]> {
    return this.http.post<Client[]>(AUTH_API.concat('clients/delete'), arrayClientId, httpOptions);
  }
}
