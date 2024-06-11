import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  userEmail: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        console.log(res), (this.userEmail = res.email);
      },
      error: (e) => console.error(e),
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toast.info('Logged Out');
  }
}
