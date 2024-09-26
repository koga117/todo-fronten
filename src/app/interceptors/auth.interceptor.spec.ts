import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { Observable, of } from 'rxjs';

describe('authInterceptor', () => {
  const interceptor = (req: HttpRequest<any>, next: (req: HttpRequest<any>) => Observable<HttpEvent<any>>) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const token = 'fake-token';
    localStorage.setItem('token', token); // Simular el token en localStorage

    // Crear un objeto HttpRequest mock
    const reqMock = new HttpRequest('GET', '/some-endpoint');

    // Crear un manejador espía (una función)
    const nextMock = jasmine.createSpy('next').and.callFake((req: HttpRequest<any>) => {
      return of(new HttpResponse({ status: 200, body: {} }));
    });

    // Ejecutar el interceptor
    interceptor(reqMock, nextMock).subscribe((event: HttpEvent<any>) => {
      // Comprobar que es un HttpResponse
      expect(event instanceof HttpResponse).toBe(true);
    });

    // Verificar que el encabezado Authorization fue añadido
    expect(nextMock).toHaveBeenCalled();
    const interceptedRequest = nextMock.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(interceptedRequest.headers.has('Authorization')).toBe(true);
    expect(interceptedRequest.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });
});
