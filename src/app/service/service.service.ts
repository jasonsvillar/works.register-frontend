import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getUserServices(page: number, rows: number, id?: number, name?: string): Observable<Service[]> {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append("id", id);
    }
    if (name) {
      queryParams = queryParams.append("name", name);
    }

    return this.http.get<Service[]>(AUTH_API + 'services/page/' + page + '/rows/' + rows, { params:queryParams, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getUserServicesRowCount(id?: number, name?: string): Observable<number> {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append("id", id);
    }
    if (name) {
      queryParams = queryParams.append("name", name);
    }

    return this.http.get<number>(AUTH_API + 'services/row-count', { params:queryParams, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  saveUserService(service: Service): Observable<Service> {
    return this.http.post<Service>(AUTH_API.concat('service'), service, httpOptions);
  }

  deleteUserService(serviceId: number): Observable<boolean> {
    return this.http.delete<boolean>(AUTH_API + 'service/' + serviceId, httpOptions);
  }

  bulkDeleteService(arrayServiceId: number[]): Observable<Service[]> {
    return this.http.post<Service[]>(AUTH_API.concat('services/delete'), arrayServiceId, httpOptions);
  }

  editUserService(service: Service): Observable<Service> {
    return this.http.put<Service>(AUTH_API.concat('service'), service, httpOptions);
  }
}
