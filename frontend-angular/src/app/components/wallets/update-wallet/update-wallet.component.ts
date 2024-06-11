import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { WalletsService } from '../../../services/wallets.service';

@Component({
  selector: 'app-update-wallet',
  templateUrl: './update-wallet.component.html',
  styleUrl: './update-wallet.component.css',
})
export class UpdateWalletComponent implements OnInit {
  updateform: FormGroup;
  walletId: any;
  wallet: any = {};

  constructor(
    private router: Router,
    private walletService: WalletsService,
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {
    this.updateform = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      accountNumber: [''],
      description: [''],
      currentBalance: [''],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.walletId = params.get('walletId');
    });
    this.walletService.getWalletById(this.walletId).subscribe({
      next: (res) => {
        console.log(res),
          (this.wallet = res),
          this.updateform.patchValue(this.wallet);
      },
      error: (e) => console.error(e),
    });
  }
  handleSubmit() {
    this.walletService
      .updateWallet(this.updateform.value, this.walletId)
      .subscribe({
        next: (res) => {
          console.log(res), this.toast.info('Wallet Updated');
        },
        error: (e) => console.error(e),
      });
  }
}
