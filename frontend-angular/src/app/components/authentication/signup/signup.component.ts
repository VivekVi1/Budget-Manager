import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toast: ToastService
  ) {
    this.signupForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  handleSubmit() {
    if (this.signupForm.valid) {
      this.authService.registerUser(this.signupForm.value).subscribe({
        next: (response) => {
          console.log(response),
            this.toast.success('Register Successful'),
            this.router.navigate(['/login']);
        },
        error: (e) => {
          console.error(e);
          this.toast.error('User Already Registered');
        },
        complete: () => console.info('complete'),
      });
    } else {
      this.toast.warn('Form is Invalid');
      console.log('Form is Invalid');
    }
  }
}
