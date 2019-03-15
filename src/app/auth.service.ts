import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    static TOKEN = 'token';

    constructor(private http: HttpClient) {
    }

    refresh(): Observable<{token: string}> {
        return this.http
            .post<{token: string}>('http://localhost:8000/api/refresh', {})
            .pipe(
                take(1),
                tap(data => this.token = data.token),
            );
    }

    set token(token) {
        localStorage.setItem(AuthService.TOKEN, token);
    }

    get token() {
        return localStorage.getItem(AuthService.TOKEN);
    }
}
