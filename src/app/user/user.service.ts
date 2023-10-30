import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { UserModel } from '../user/user.model';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(baseUrl.concat("api/v1/user"), data);
  }

  login(data: any): Observable<any> {
    return this.http.post(baseUrl.concat("api/auth/basic-authentication"), data);
  }
}
