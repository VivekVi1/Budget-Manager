import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public baseUrl = `http://localhost:8080/auth`;
  constructor(private http: HttpClient) {}

  registerUser(signupForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, signupForm);
  }
  loginUser(loginForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginForm);
  }
}
