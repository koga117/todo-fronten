// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private registerUrl = `${this.apiUrl}register`;
    private loginUrl = `${this.apiUrl}login`;

    constructor(private http: HttpClient, private toastr: ToastrService) { }

    register(user: User): Observable<any> {
        return this.http.post(this.registerUrl, user).pipe(
            tap(() => {
                this.toastr.success('Usuario registrado exitosamente');
            }),
            catchError(error => {
                const errorMsg = error?.error?.message || 'Error al registrar el usuario';
                this.toastr.error(errorMsg);
                return throwError(error);
            })
        );
    }

    login(user: User): Observable<any> {
        return this.http.post(this.loginUrl, user).pipe(
            tap((response: any) => {
                const { token, userId } = response;
                if (token && userId) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    this.toastr.success('Inicio de sesión exitoso');
                } else {
                    this.toastr.error('No se recibió un token o userId de autenticación');
                }
            }),
            catchError(error => {
                const errorMsg = error?.error?.message || 'Error en inicio de sesión';
                this.toastr.error(errorMsg);
                return throwError(error);
            })
        );
    }

    // Método para verificar si el usuario está autenticado
    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token !== null;
    }

    // Método para obtener el userId del usuario autenticado
    getUserId(): string | null {
        return localStorage.getItem('userId');
    }
}
