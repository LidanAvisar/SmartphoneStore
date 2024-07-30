import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import HttpClient correctly
import { AuthInterceptor } from './services/auth.interceptor'; // Import the interceptor

import { AuthGuard } from './auth.guard'; // Ensure AuthGuard is imported
import { appRoutes } from './app.routes'; // Import the routes

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard, // Provide AuthGuard if not already provided
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Register the interceptor
  ]
})
export class AppModule { }
