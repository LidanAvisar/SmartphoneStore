import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public connectionStatus$: BehaviorSubject<{ [key: string]: string }> = new BehaviorSubject({});

  constructor(private authService: AuthService) {
    const token = this.authService.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5044/connectionHub', {
        accessTokenFactory: () => token ? token : '',
        withCredentials: true
      })
      .build();

    this.hubConnection.on('UpdateConnectionStatus', (connections: { [key: string]: string }) => {
      this.connectionStatus$.next(connections);
    });

    this.hubConnection.start()
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  public requestConnectionStatusUpdate() {
    this.hubConnection.invoke("UpdateConnectionStatus")
      .catch(err => console.error('Error while requesting connection status update: ' + err));
  }
}
