import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection; // Use non-null assertion operator
  public connectionStatus$: BehaviorSubject<{ [key: string]: string }> = new BehaviorSubject({});

  constructor() {
    this.startConnection();
    this.registerOnServerEvents();
  }

  private startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5044/connectionHub', {
        accessTokenFactory: () => localStorage.getItem('token') || '',
        withCredentials: true
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('UpdateConnectionStatus', (connections: { [key: string]: string }) => {
      this.connectionStatus$.next(connections);
    });
  }

  public requestConnectionStatusUpdate() {
    this.hubConnection.invoke("UpdateConnectionStatus")
      .catch(err => console.error('Error while requesting connection status update: ' + err));
  }
}
