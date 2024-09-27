import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const excludedUrls = ['/login', '/register'];
  const isExcludedUrl = excludedUrls.some(url => req.url && req.url.includes(url));

  if (token && !isExcludedUrl) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `${token}` // Asegúrate de agregar "Bearer "
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
