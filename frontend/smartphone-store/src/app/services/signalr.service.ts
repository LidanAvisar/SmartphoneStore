import { Injectable, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {
  private hubConnection: signalR.HubConnection | undefined;
  private connectionStatusSubject = new BehaviorSubject<{ [key: string]: string }>({});
  public connectionStatus$: Observable<{ [key: string]: string }> = this.connectionStatusSubject.asObservable();

  constructor() {
    this.startConnection();
  }

  private startConnection(): void {
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5044/connectionHub')
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('SignalR connection established.');
          this.requestConnectionStatusUpdate();
        })
        .catch(err => console.error('Error while starting SignalR connection: ' + err));

      this.hubConnection.on('UpdateConnectionStatus', (status) => {
        this.connectionStatusSubject.next(status);
      });
    }
  }

  public requestConnectionStatusUpdate(): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('RequestConnectionStatusUpdate')
        .catch(err => console.error(err));
    }
  }

  public disconnect(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(err => console.error(err));
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
