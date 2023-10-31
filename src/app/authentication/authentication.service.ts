import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(AUTH_API.concat("basic-authentication"), data, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.get(AUTH_API + 'logout-jwt', httpOptions);
  }
}
