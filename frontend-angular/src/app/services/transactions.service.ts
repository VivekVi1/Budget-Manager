import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  baseUrl = 'http://localhost:8080/transaction';
  token = localStorage.getItem('token');
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  constructor(private http: HttpClient) {}

  getTransactions(walletId: any): Observable<any> {
    return this.http.get(this.baseUrl + `/${walletId}`, {
      headers: this.header,
    });
  }
  getTransactionById(walletId: any, transactionId: any): Observable<any> {
    return this.http.get(this.baseUrl + `/${walletId}/${transactionId}`, {
      headers: this.header,
    });
  }
  addTransaction(transactionForm: any, walletId: any): Observable<any> {
    return this.http.post(this.baseUrl + `/${walletId}`, transactionForm, {
      headers: this.header,
    });
  }
  editTransaction(
    editTransactionForm: any,
    walletId: any,
    transactionId: any
  ): Observable<any> {
    return this.http.put(
      this.baseUrl + `/${walletId}/${transactionId}`,
      editTransactionForm,
      {
        headers: this.header,
      }
    );
  }
  deleteTransaction(walletId: any, transactionId: any): Observable<any> {
    return this.http.delete(this.baseUrl + `/${walletId}/${transactionId}`, {
      headers: this.header,
    });
  }
}
