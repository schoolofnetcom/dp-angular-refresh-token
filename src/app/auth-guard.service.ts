import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.token) {
            this.router.navigate(['/login']);
            return false;
        }
        // OAuth2 - expires_in: 3600
        // Date.now is the storage date in app | 3600 seconds is an hour 60*60*60
        //new Date(Date.now() + 3600).getTime()
        const expiresAt = new Date(Date.now() + 3600).valueOf();
        const now = new Date().valueOf();
        // JWT
        //const expiresAt = new Date(0).setUTCSeconds(timestamp).valueOf();
        //const now = new Date().valueOf();
        if (expiresAt < now) {
            return this.authService.refresh().pipe(
                map(() => true),
                catchError(() => {
                    this.router.navigate(['/login']);
                    return throwError(false);
                })
            );
        }

        return true;
    }
}
