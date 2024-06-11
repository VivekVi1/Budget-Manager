import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/authentication/edit-profile/edit-profile.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddTransactionComponent } from './components/transactions/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './components/transactions/edit-transaction/edit-transaction.component';
import { TransactionComponent } from './components/transactions/transactions.component';
import { CreateWalletComponent } from './components/wallets/create-wallet/create-wallet.component';
import { UpdateWalletComponent } from './components/wallets/update-wallet/update-wallet.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: EditProfileComponent },
  { path: 'createwallet', component: CreateWalletComponent },
  { path: 'updatewallet/:walletId', component: UpdateWalletComponent },
  { path: 'transactions/:walletId', component: TransactionComponent },
  { path: 'transactions/add/:walletId', component: AddTransactionComponent },
  {
    path: 'transactions/edit/:walletId/:transactionId',
    component: EditTransactionComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
