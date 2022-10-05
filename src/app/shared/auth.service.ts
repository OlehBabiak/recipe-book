import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs"

export interface AuthResponseData {
  jwt_token: string
  refresh_token: string
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  register(body: { email: string, password: string }) {
    return this.http.post<AuthResponseData>('http://localhost:8090/api/auth/register', body)
      .pipe(catchError(this.handleError))
  }

  login(body: { email: string, password: string }) {
    return this.http.post<AuthResponseData>('http://localhost:8090/api/auth/login', body)
      .pipe(catchError(this.handleError))
  }

  private handleError (errorRes: HttpErrorResponse) {
    const {error, message} = errorRes;
    let errorMessage = 'Unknown error occurred!';
    if (!error || !message) {
      return throwError(() => errorMessage);
    }
    errorMessage = error.message
    return throwError(() => errorMessage);
  }
}
