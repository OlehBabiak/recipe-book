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
  expiresIn: string,
  expiresInRefresh: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any

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
          ({email, id, jwt_token, refresh_token, expiresIn, expiresInRefresh}) => {
            this.handleAuth(email, id, jwt_token, refresh_token, +expiresIn, +expiresInRefresh)
            this.router.navigate(["./recipes"])
          }
        ))
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["./auth"]);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  autologin() {
    const userData: {
      email: string
      id: string
      _token: string
      _refresh_token: string
      _tokenExpirationDate: string;
      _refreshTokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return
    }
    const loadedUserFromLS = new User(
      userData.email,
      userData.id,
      userData._token,
      userData._refresh_token,
      new Date(userData._tokenExpirationDate),
      new Date(userData._refreshTokenExpirationDate)
    );
    //Перевіряємо чи наш токен ще активний, якщо так то активуємо юзера
    if (loadedUserFromLS.token) {
      const expirationTime = new Date(userData._refreshTokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationTime)
      this.user.next(loadedUserFromLS)
    }
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const refreshExpirationDate = new Date(new Date().getTime() + refreshExpiresIn * 1000)
    const user = new User(
      email,
      userId,
      token,
      refreshToken,
      expirationDate,
      refreshExpirationDate
    );
    this.user.next(user);
    this.autoLogout(refreshExpiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
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
