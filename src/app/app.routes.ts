import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './layout/home/home';
import { MenClothing } from './layout/men-clothing/men-clothing';
import { WomenClothing } from './layout/women-clothing/women-clothing';
import { ProductsDetails } from './layout/products-details/products-details';
import { MyProfile } from './layout/my-profile/my-profile';
import { ContactUs } from './layout/contact-us/contact-us';
import { About } from './layout/about/about';
import { Cart } from './layout/cart/cart';

import { HomeMang } from './dashboard/home-mang/home-mang';
import { MenClothingMang } from './dashboard/men-clothing-mang/men-clothing-mang';
import { WomenClothingMang } from './dashboard/women-clothing-mang/women-clothing-mang';
import { MyProfileMang } from './dashboard/my-profile-mang/my-profile-mang';
import { ContactUsMng } from './dashboard/contact-us-mng/contact-us-mng';
import { AboutMng } from './dashboard/about-mng/about-mng';
import { UsersMng } from './dashboard/users-mng/users-mng';
import { OrdersMang } from './dashboard/orders-mang/orders-mang';

import { NotFound } from './share/not-found/not-found';
import { Auth } from './share/auth/auth';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: Auth },

  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'men', component: MenClothing },
      { path: 'women', component: WomenClothing },
      { path: 'productsDetails', component: ProductsDetails },
      { path: 'about', component: About },
      { path: 'contact', component: ContactUs },
      { path: 'profile', component: MyProfile },
      { path: 'cart', component: Cart }
    ]
  },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeMang },
      { path: 'men', component: MenClothingMang },
      { path: 'women', component: WomenClothingMang },
      { path: 'about', component: AboutMng },
      { path: 'contact', component: ContactUsMng },
      { path: 'users', component: UsersMng },
      { path: 'orders', component: OrdersMang },
      { path: 'profile', component: MyProfileMang }
    ]
  },

  { path: '**', component: NotFound }
];
