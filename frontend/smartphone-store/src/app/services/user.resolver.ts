import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  resolve(): Observable<any> {
    console.log('UserResolver resolve called');
    const token = this.authService.getToken();
    console.log('Token:', token);
    if (!token) {
      console.log('No token found. Navigating to login.');
      this.router.navigate(['/login']);
      return of(null);
    }

    return this.apiService.getUserDetails().pipe(
      catchError((error) => {
        console.error('Error fetching user details', error);
        this.router.navigate(['/login']);
        return of(null);
      })
    );
  }
}
