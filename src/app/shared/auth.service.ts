import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface AuthResponseData {
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

  register(body: {email: string, password: string}) {
    return this.http.post('http://localhost:8090/api/auth/register', body)
  }

  login(body: {email: string, password: string}) {
    return this.http.post<AuthResponseData>('http://localhost:8090/api/auth/login', body)
  }
}
