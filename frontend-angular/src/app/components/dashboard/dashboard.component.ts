import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletsService } from '../../services/wallets.service';

interface Wallet {
  id: number;
  name: string;
  accountNumber: number;
  description: String;
  currentBalance: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  wallets: Wallet[] = [];
  totalBalance: number = 0;

  constructor(private router: Router, private walletService: WalletsService) {}

  ngOnInit(): void {
    this.walletService.getWallets().subscribe({
      next: (response) => {
        console.log(response),
          (this.wallets = response),
          (this.totalBalance = this.wallets.reduce(
            (acc, wallet) => acc + wallet.currentBalance,
            0
          ));
      },
      error: (e) => console.log(e),
    });
  }
  onWalletDeleted(walletId: number): void {
    // this.wallets = this.wallets.filter((wallet) => wallet.id !== walletId);
    // this.totalBalance = this.wallets.reduce(
    //   (acc, wallet) => acc + wallet.currentBalance,
    //   0
    // );
    this.ngOnInit();
  }
}
