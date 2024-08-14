import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NotificationService } from './notification.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor(
    // private toastr: ToastrService,
    private notificationService: NotificationService
  )
  {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7189/Notify', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public showNotification(notification: any) {
    console.log('notification:', notification);
  }

  public addListener = () => {
    this.hubConnection.on('SendMessage', (notification: any) => {
      // this.showNotification(notification);
      // notify other parts of the app about the received message
      this.notificationService.notify(notification); //pass notification to notificationService that uses observables
    });
  };
}
