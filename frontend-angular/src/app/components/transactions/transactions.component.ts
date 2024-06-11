import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { TransactionsService } from '../../services/transactions.service';
import { WalletsService } from '../../services/wallets.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionComponent implements OnInit {
  walletId: any;
  transactions: any[] = [];
  wallet: any = {};
  totalSpent: number = 0;
  remainingBalance: number = 0;

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private walletService: WalletsService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.walletId = params.get('walletId');
    });
    console.log(this.walletId);
    this.getCurrentWallet();
    this.getTransactions();
  }

  calculateBalances(): void {
    this.totalSpent = this.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    this.remainingBalance = this.wallet.currentBalance - this.totalSpent;
  }

  getTransactions(): void {
    this.transactionsService.getTransactions(this.walletId).subscribe({
      next: (res) => {
        console.log(res), (this.transactions = res);
        this.calculateBalances();
        console.log(this.remainingBalance);
      },
      error: (e) => console.log(e),
    });
  }

  deleteTransaction(walletId: any, transactionId: number): void {
    this.transactionsService
      .deleteTransaction(walletId, transactionId)
      .subscribe({
        next: (res) => {
          this.getTransactions(), this.toast.warn('Transaction Deleted');
        },
        error: (e) => console.error(e),
      });
  }

  getCurrentWallet() {
    this.walletService.getWalletById(this.walletId).subscribe({
      next: (res) => {
        console.log(res), (this.wallet = res);
      },
      error: (e) => console.log(e),
    });
  }
}
