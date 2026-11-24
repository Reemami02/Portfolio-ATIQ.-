import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarMng } from './share/navbar-mng/navbar-mng';

@Component({
  imports: [RouterOutlet,NavbarMng],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
