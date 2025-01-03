import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_API} from '../token/baseUrl.token'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_API) private apiUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.startsWith('http')) {
      
      // Clone the request and modify its URL by prepending the environment's API URL
      const apiReq = request.clone({
        url: `${this.apiUrl}/${request.url}` // Prepend the base URL
      });

      // Pass the cloned request instead of the original request
      return next.handle(apiReq);
    }
    return next.handle(request);
  }
}
