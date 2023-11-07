import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
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

  getServices(page: number, rows: number): Observable<Service[]> {
    return this.http.get<Service[]>(AUTH_API + 'services/page/' + page + '/rows/' + rows, httpOptions);
  }

  getRowCount(): Observable<number> {
    return this.http.get<number>(AUTH_API + 'services/row-count', httpOptions);
  }
}
