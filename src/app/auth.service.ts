import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, take, tap} from 'rxjs/operators';
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
                tap(data => this.token = data.token),
                take(1),
            ); //memory leak
    }

    set token(token) {
        localStorage.setItem(AuthService.TOKEN, token);
    }

    get token() {
        return localStorage.getItem(AuthService.TOKEN);
    }
}
