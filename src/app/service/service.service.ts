import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './interfaces/service';

const AUTH_API = 'http://localhost:8080/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getUserServices(page: number, rows: number): Observable<Service[]> {
    return this.http.get<Service[]>(AUTH_API + 'services/page/' + page + '/rows/' + rows, httpOptions);
  }

  getUserServicesRowCount(): Observable<number> {
    return this.http.get<number>(AUTH_API + 'services/row-count', httpOptions);
  }

  getAllServices(page: number, rows: number): Observable<Service[]> {
    return this.http.get<Service[]>(AUTH_API + 'services/all/page/' + page + '/rows/' + rows, httpOptions);
  }

  getAllServicesRowCount(): Observable<number> {
    return this.http.get<number>(AUTH_API + 'services/all/row-count', httpOptions);
  }

  getAllUnusedServicesForCurrentUser(page: number, rows: number): Observable<Service[]> {
    return this.http.get<Service[]>(AUTH_API + 'services/unused/page/' + page + '/rows/' + rows, httpOptions);
  }

  getAllUnusedServicesRowCountForCurrentUser(): Observable<number> {
    return this.http.get<number>(AUTH_API + 'services/unused/row-count', httpOptions);
  }

  saveService(service: Service): Observable<Service> {
    return this.http.post<Service>(AUTH_API.concat("service"), service, httpOptions);
  }
}
