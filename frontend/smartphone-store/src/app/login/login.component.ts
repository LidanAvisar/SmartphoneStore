import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.authService.setRole(this.username === 'admin' && this.password === 'admin1234' ? 'admin' : 'user');
        this.router.navigate(['/products']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
