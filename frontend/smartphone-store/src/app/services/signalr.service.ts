import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public connectionStatus$: BehaviorSubject<{ [key: string]: string }> = new BehaviorSubject({});

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5044/connectionHub', {
        accessTokenFactory: () => localStorage.getItem('token') || '', // Ensure token is sent
        withCredentials: true // Ensure credentials are sent
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
