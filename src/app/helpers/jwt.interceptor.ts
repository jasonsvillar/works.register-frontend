import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from 'src/app/authentication/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private storageService: StorageService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.storageService.getUser();
        const isLoggedIn = this.storageService.isLoggedIn();
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.jwt}` }
            });
        }

        return next.handle(request);
    }
}