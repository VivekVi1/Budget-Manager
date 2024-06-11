import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardItemComponent } from './components/dashboard/dashboard-item/dashboard-item.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditProfileComponent } from './components/authentication/edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateWalletComponent } from './components/wallets/create-wallet/create-wallet.component';
import { UpdateWalletComponent } from './components/wallets/update-wallet/update-wallet.component';
import { TransactionComponent } from './components/transactions/transactions.component';
import { AddTransactionComponent } from './components/transactions/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './components/transactions/edit-transaction/edit-transaction.component';
import { AngularToastifyModule } from 'angular-toastify';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    DashboardItemComponent,
    PageNotFoundComponent,
    EditProfileComponent,
    CreateWalletComponent,
    UpdateWalletComponent,
    TransactionComponent,
    AddTransactionComponent,
    EditTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularToastifyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
