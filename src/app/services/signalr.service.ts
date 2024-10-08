import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Notification } from '../models/notification';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor(
    private toastrService: ToastrService,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private userService:UserService
  ) {}

  public startConnection = (userId: number) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7189/Notify?userId=${userId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public showNotification(notification: Notification) {
    const userId = this.userService.getConnectedUser().id;
    console.log('notification:', notification);
    if (
      notification.userId != userId &&
      notification.title != 'Licence Request Failed'
    ) {
      this.toastrService.info(notification.message);
    }

  }

  public addListener = () => {
    this.hubConnection.on('SendMessage', (notification: Notification) => {
      this.showNotification(notification);
      // notify other parts of the app about the received message
      this.notificationService.notify(notification); //pass notification to notificationService that uses observables
    });
  };
}
