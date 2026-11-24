import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServices } from '../../core/services/auth-services';
import { User } from '../../core/models/userInterface';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  private authService = inject(AuthServices);
  private router = inject(Router);

  isLogin = true;
  loading = false;
  errorMessage = '';

  registerData: User = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  loginData = {
    email: '',
    password: ''
  };

  switchForm(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  register(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.loading = false;
        this.isLogin = true;
        this.errorMessage = 'Account created. Please login.';
        this.registerData = {
          name: '',
          email: '',
          password: '',
          phone: ''
        };
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.error?.error
          || error.error?.message
          || 'Could not create account.';
      }
    });
  }

  login(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(
      this.loginData.email,
      this.loginData.password
    ).subscribe({
      next: () => {
        this.loading = false;

        if (this.authService.isAdmin) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Invalid email or password.';
      }
    });
  }
}
