import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { WalletsService } from '../../../services/wallets.service';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrl: './create-wallet.component.css',
})
export class CreateWalletComponent {
  createWalletForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private walletService: WalletsService,
    private toast: ToastService
  ) {
    this.createWalletForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      accountNumber: [''],
      description: [''],
      currentBalance: [''],
    });
  }

  submitHandler() {
    this.walletService.createWallet(this.createWalletForm.value).subscribe({
      next: (response) => {
        console.log('Success', response);
        this.router.navigate(['/dashboard']);
        this.toast.info(`Wallet Created : ${response.name}`);
      },
      error: (err) => console.log('Cannot post wallet data', err),
    });
  }
}
