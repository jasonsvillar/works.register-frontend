import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './interfaces/login-request';
import { LoginResponse } from './interfaces/login-response';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(AUTH_API.concat("basic-authentication"), loginRequest, {observe: 'response'});
  }

  logout(): Observable<any> {
    return this.http.get(AUTH_API + 'logout-jwt', httpOptions);
  }
}
