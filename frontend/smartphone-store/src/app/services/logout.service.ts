import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SignalRService } from './signalr.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private authService: AuthService, private signalRService: SignalRService) {}

  logout(): void {
    this.authService.clearToken();
    this.signalRService.disconnect();
  }
}
