import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
    token(arg0: string, token: any): unknown;
    id: number;
    name: string;
    phone: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/user';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, { username, password }).pipe(
            tap(user => this.currentUserSubject.next(user))
        );
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}