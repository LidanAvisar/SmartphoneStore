import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ControlComponent } from './control/control.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'control', component: ControlComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];