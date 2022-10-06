import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs"
import {AuthModel} from "../auth/auth.model";
import {User} from "../auth/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  jwt_token: string
  refresh_token: string
  id: string,
  email: string,
  expiresIn: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient, private router: Router) {
  }


  register(body: AuthModel) {
    return this.http.post<AuthResponseData>('http://localhost:8090/api/auth/register', body)
      .pipe(catchError(this.handleError))
  }

  login(body: AuthModel) {
    return this.http.post<AuthResponseData>('http://localhost:8090/api/auth/login', body)
      .pipe(
        catchError(this.handleError),
        tap(
          ({email, id, jwt_token, refresh_token, expiresIn}) => {
            this.handleAuth(email, id, jwt_token, refresh_token, +expiresIn)
            this.router.navigate(["./recipes"])
          }
        ))
  }

  logout() {
    this.user.next(null)
  }

  private handleAuth(email: string, userId: string, token: string, refreshToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(
      email,
      userId,
      token,
      refreshToken,
      expirationDate
    );
    this.user.next(user)
  }

  private handleError(errorRes: HttpErrorResponse) {
    const {error, message} = errorRes;
    let errorMessage = 'Unknown error occurred!';
    if (!error || !message) {
      return throwError(() => errorMessage);
    }
    errorMessage = error.message
    return throwError(() => errorMessage);
  }
}
