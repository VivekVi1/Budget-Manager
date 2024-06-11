import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  editUserForm: FormGroup;
  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastService
  ) {
    this.editUserForm = formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }
  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        console.log(res);
        this.editUserForm.patchValue(res);
      },
    });
  }

  updateUser() {
    this.userService.editUser(this.editUserForm.value).subscribe({
      next: (res) => {
        console.log(res), this.toast.info('User Updated');
      },
      error: (e) => console.error(e),
    });
  }
}
