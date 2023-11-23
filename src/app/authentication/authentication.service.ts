import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './interfaces/login-request';
import { LoginResponse } from './interfaces/login-response';

import { environment } from '../../environments/environment';


const AUTH_API = environment.linkBackend + '/api/auth/';


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
