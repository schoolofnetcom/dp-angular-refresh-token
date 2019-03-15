import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {TokenInterceptorService} from './token-interceptor.service';
import {Observable, throwError} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RefreshTokenInterceptorService {

    constructor(
        private router: Router,
        private authService: AuthService,
        private tokenInterceptor: TokenInterceptorService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(error => {
                    const responseError = error as HttpErrorResponse;
                    if (responseError.status === 401) {
                        return this.authService.refresh()
                            .pipe(
                                flatMap(() => this.tokenInterceptor.intercept(req, next)),
                                catchError((refreshError) => {
                                    this.router.navigate(['/login']);
                                    return throwError(refreshError);
                                })
                            );
                    }

                    return throwError(error);
                })
            );
    }
}
