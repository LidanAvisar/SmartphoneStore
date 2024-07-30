import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserResolver } from './services/user.resolver';

export const appRoutes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    canActivate: [AuthGuard],
    resolve: { user: UserResolver }
  },
  {
    path: 'add-product',
    loadComponent: () => import('./add-product/add-product.component').then(m => m.AddProductComponent),
    canActivate: [AuthGuard],
    resolve: { user: UserResolver },
    data: { expectedRole: 'admin' }
  },
  {
    path: 'control',
    loadComponent: () => import('./control/control.component').then(m => m.ControlComponent),
    canActivate: [AuthGuard],
    resolve: { user: UserResolver },
    data: { expectedRole: 'admin' }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
