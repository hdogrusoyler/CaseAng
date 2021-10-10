import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private service: ServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.token;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${JSON.parse(token)}` //Bearer
        }
      });
      
    }
    return next.handle(request);
  }
  
}
