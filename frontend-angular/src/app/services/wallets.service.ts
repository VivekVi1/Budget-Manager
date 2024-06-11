import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  baseUrl = 'http://localhost:8080/wallet';
  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  getWallets(): Observable<any> {
    return this.http.get(this.baseUrl, {
      headers: this.header,
    });
  }
  getWalletById(walletId: any): Observable<any> {
    return this.http.get(this.baseUrl + `/${walletId}`, {
      headers: this.header,
    });
  }
  createWallet(createWalletForm: any): Observable<any> {
    return this.http.post(this.baseUrl, createWalletForm, {
      headers: this.header,
    });
  }
  deleteWallet(walletId: any): Observable<any> {
    return this.http.delete(this.baseUrl + `/${walletId}`, {
      headers: this.header,
    });
  }
  updateWallet(updateWalletForm: any, walletId: any): Observable<any> {
    return this.http.put(this.baseUrl + `/${walletId}`, updateWalletForm, {
      headers: this.header,
    });
  }
}
