import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from 'src/app/authentication/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false;

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

        return next.handle(request).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    !request.url.includes('user/login') &&
                    error.status === 401
                ) {
                    return this.handle401Error(request, next);
                }

                return throwError(() => error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            if (this.storageService.isLoggedIn()) {
                this.storageService.clean();
            }
        }

        return next.handle(request);
    }
}