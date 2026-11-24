import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserServices } from '../../core/services/user-services';

@Component({
  selector: 'app-users-mng',
  imports: [CommonModule, FormsModule],
  templateUrl: './users-mng.html',
  styleUrl: './users-mng.css'
})
export class UsersMng implements OnInit {
  private userService = inject(UserServices);

  users: any[] = [];
  editingId = '';
  message = '';

  form: any = {
    name: '',
    email: '',
    password: '',
    phone: '',
    age: undefined,
    nationality: '',
    gender: ''
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: response => {
        this.users = response.users || [];
      },
      error: () => {
        this.message = 'Could not load users.';
      }
    });
  }

  edit(user: any): void {
    this.editingId = user._id;
    this.form = { ...user, password: '' };
  }

  reset(): void {
    this.editingId = '';
    this.form = {
      name: '',
      email: '',
      password: '',
      phone: '',
      age: undefined,
      nationality: '',
      gender: ''
    };
  }

  save(): void {
    const request = this.editingId
      ? this.userService.updateUser(this.editingId, this.form)
      : this.userService.addUser(this.form);

    request.subscribe({
      next: () => {
        this.message = this.editingId ? 'User updated.' : 'User added.';
        this.reset();
        this.loadUsers();
      },
      error: error => {
        this.message = error.error?.error || 'Could not save user.';
      }
    });
  }

  remove(id: string): void {
    if (!confirm('Delete this user?')) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.message = 'User deleted.';
        this.loadUsers();
      },
      error: () => {
        this.message = 'Could not delete user.';
      }
    });
  }
}
