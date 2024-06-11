import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token = localStorage.getItem('token');
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`http://localhost:8080/auth/profile`, {
      headers: this.header,
    });
  }
  editUser(editUserForm: any): Observable<any> {
    return this.http.put(`http://localhost:8080/auth/profile`, editUserForm, {
      headers: this.header,
    });
  }
}
