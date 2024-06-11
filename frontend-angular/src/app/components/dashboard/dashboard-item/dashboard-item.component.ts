import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { WalletsService } from '../../../services/wallets.service';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
})
export class DashboardItemComponent implements OnInit {
  @Input() wallet: any;
  @Output() walletDeleted = new EventEmitter<number>();

  constructor(
    private walletService: WalletsService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    console.log(this.wallet);
  }

  deleteWallet(): void {
    if (confirm('Are you sure you want to delete this wallet?')) {
      this.walletService.deleteWallet(this.wallet.id).subscribe({
        next: (res) => {
          console.log(res);
          console.log(`Deleting wallet with ID: ${this.wallet.id}`);
          this.walletDeleted.emit(this.wallet.id);
          this.toast.warn('Wallet Deleted');
        },
        error: (e) => console.log(e),
      });
    }
  }
}
