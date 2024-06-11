import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { TransactionsService } from '../../../services/transactions.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.css',
})
export class EditTransactionComponent {
  editTransactionForm: FormGroup;
  walletId: any;
  transactionId: any;
  transaction: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private transactionService: TransactionsService,
    private toast: ToastService
  ) {
    this.editTransactionForm = this.formBuilder.group({
      amount: [''],
      description: [''],
      transactionDate: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.walletId = params.get('walletId');
      this.transactionId = params.get('transactionId');
    });
    this.transactionService
      .getTransactionById(this.walletId, this.transactionId)
      .subscribe({
        next: (res) => {
          console.log(res),
            (this.transaction = res),
            this.editTransactionForm.patchValue(this.transaction);
        },
        error: (e) => console.error(e),
      });
  }

  handleSubmit(): void {
    this.transactionService
      .editTransaction(
        this.editTransactionForm.value,
        this.walletId,
        this.transactionId
      )
      .subscribe({
        next: (res) => {
          console.log(res), this.toast.info('Transaction Updated');
        },
        error: (e) => console.error(e),
      });
  }
}
