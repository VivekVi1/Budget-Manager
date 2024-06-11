import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../../services/transactions.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  walletId: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transactionsService: TransactionsService,
    private toast: ToastService
  ) {
    this.transactionForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      transactionDate: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.walletId = params.get('walletId');
    });
    console.log(this.walletId);
  }

  onSubmit(): void {
    console.log(this.transactionForm.value);
    this.transactionsService
      .addTransaction(this.transactionForm.value, this.walletId)
      .subscribe({
        next: (res) => {
          console.log(res), this.toast.info('Transaction Added');
        },
        error: (e) => console.log(e),
      });
  }
}
