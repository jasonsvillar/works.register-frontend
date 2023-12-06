import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './interfaces/service';

import { environment } from '../../environments/environment';


const AUTH_API = environment.linkBackend + '/api/v1/';

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

  saveService(service: Service): Observable<Service> {
    return this.http.post<Service>(AUTH_API.concat('service'), service, httpOptions);
  }

  deleteUserService(serviceId: number): Observable<boolean> {
    return this.http.delete<boolean>(AUTH_API + 'service/' + serviceId, httpOptions);
  }

  bulkDeleteService(arrayServiceId: number[]): Observable<Service[]> {
    return this.http.post<Service[]>(AUTH_API.concat('services/delete'), arrayServiceId, httpOptions);
  }
}
