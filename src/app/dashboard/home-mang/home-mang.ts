import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductServices } from '../../core/services/product-services';
import { UserServices } from '../../core/services/user-services';

@Component({
  selector: 'app-home-mang',
  imports: [RouterLink],
  templateUrl: './home-mang.html',
  styleUrl: './home-mang.css'
})
export class HomeMang implements OnInit {
  private productService = inject(ProductServices);
  private userService = inject(UserServices);

  menCount = 0;
  womenCount = 0;
  userCount = 0;

  ngOnInit(): void {
    this.productService.getMenProducts().subscribe(products => {
      this.menCount = products.length;
    });

    this.productService.getWomenProducts().subscribe(products => {
      this.womenCount = products.length;
    });

    this.userService.getUsers().subscribe(response => {
      this.userCount = (response.users || []).length;
    });
  }
}
