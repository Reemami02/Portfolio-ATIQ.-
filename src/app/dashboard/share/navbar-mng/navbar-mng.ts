import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../core/services/auth-services';

@Component({
  imports: [RouterLinkActive, RouterLink],
  selector: 'app-navbar-mng',
  styleUrl: './navbar-mng.css',
  templateUrl: './navbar-mng.html',
})
export class NavbarMng {
  private auth = inject(AuthServices);
  private router = inject(Router);
  isMenuOpen = false;
  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; }
  logout() { this.auth.logout(); }
}
