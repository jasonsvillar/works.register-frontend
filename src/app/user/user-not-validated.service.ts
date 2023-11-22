import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNotValidatedRequest } from './interfaces/user-not-validated-request';
import { UserNotValidatedResponse } from './interfaces/user-not-validated-response';
import { User } from './interfaces/user';

const AUTH_API = 'http://localhost:8080/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserNotValidatedService {

  constructor(private http: HttpClient) { }

  register(userNotValidatedRequest: UserNotValidatedRequest): Observable<UserNotValidatedResponse> {
    return this.http.post<UserNotValidatedResponse>(AUTH_API.concat("pre-user"), userNotValidatedRequest, httpOptions);
  }

  validate(name: String, email: String, code: string): Observable<User> {
    return this.http.get<User>(AUTH_API.concat("pre-user/validate/name/"+name+"/email/"+email+"/code/"+code), httpOptions);
  }
}
