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
    private apiUrl = environment.apiUrl
    private registerUrl = `${this.apiUrl}register`;
    private loginUrl = `${this.apiUrl}login`;

    constructor(private http: HttpClient, private toastr: ToastrService) { }

    register(user: User): Observable<any> {
        return this.http.post(this.registerUrl, user).pipe(
            tap(() => {
                this.toastr.success('Usuario registrado exitosamente');
            }),
            catchError(error => {
                this.toastr.error('Error al registrar el usuario');
                return throwError(error);
            })
        );
    }

    login(user: User): Observable<any> {
        console.log(user)
        return this.http.post(this.loginUrl, user).pipe(
            tap(() => {
                this.toastr.success('Inicio de sesión exitoso');
            }),
            catchError(error => {
                this.toastr.error('Error en inicio de sesión');
                return throwError(error);
            })
        );
    }

    // Método para verificar si el usuario está autenticado
    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token !== null;
    }

}
