import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    const authReq = req.clone({
      setHeaders: { Authorization: `bearer ${token}` },
    });
    console.log('sending request', authReq.method, ' ', authReq.urlWithParams);
    return next.handle(authReq);
  }
}
