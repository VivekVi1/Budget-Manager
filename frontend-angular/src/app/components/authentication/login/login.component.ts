import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toast: ToastService
  ) {
    this.loginForm = formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.toast.success(`Login Successful}`);
          localStorage.setItem('token', response.jwtToken);
          this.router.navigateByUrl('/dashboard');
        },
        error: (e) => {
          console.error(e), this.toast.error('User not found');
        },
        complete: () => console.info('complete'),
      });
    } else {
      console.log('Form is Invalid');
    }
  }
}
