import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuard canActivate called');
    if (this.authService.isLoggedIn()) {
      const expectedRole = route.data['expectedRole'];
      console.log('Expected Role:', expectedRole);
      console.log('User Role:', this.authService.getRole());
      if (expectedRole && this.authService.getRole() !== expectedRole) {
        console.log('User role does not match expected role. Navigating to login.');
        this.router.navigate(['/login']);
        return false;
      }
      console.log('User is authorized to access this route.');
      return true;
    } else {
      console.log('User is not logged in. Navigating to login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
