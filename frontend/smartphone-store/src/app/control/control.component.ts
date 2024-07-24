import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { SignalRService } from '../services/signalr.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {
  connections: { [key: string]: string } = {};
  private connectionSubscription: Subscription | undefined;
  private updateSubscription: Subscription | undefined;
  Object = Object; // Make `Object` accessible in the template

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.connectionSubscription = this.signalRService.connectionStatus$.subscribe(status => {
      this.connections = status;
    });

    // Request updates every second
    this.updateSubscription = interval(1000).subscribe(() => {
      this.signalRService.requestConnectionStatusUpdate();
    });
  }

  ngOnDestroy(): void {
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  getStatusColor(isConnected: boolean): string {
    return isConnected ? 'green' : 'red';
  }
}
