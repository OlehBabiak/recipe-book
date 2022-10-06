import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {exhaustMap, Observable, take} from 'rxjs';
import {AuthService} from "../shared/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

//we should provide interceptor in app module
  //take(1) означає що мені треба взяти одне значення з observable і потім відразу відписатись
  // другий параметр exhaustMap чекає коли перший observable завершиться, після цього отримує його user
  // в exhaustMap ми повертаємо новий observable який замінює наш попередній observable
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request
          .clone({headers: new HttpHeaders({'Authorization': user.token})})
        return next.handle(modifiedReq);
      }));

  }
}
