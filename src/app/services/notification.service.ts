import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//this is a shared service takes notifications from signalr service to other services
export class NotificationService {

  constructor() { }

  private notificationSubject = new Subject<any>(); //a subject that acts as an event bus for notifications

  // observable to allow components to subscribe and listen to notifications
  // the $ suffix is a naming convention for variables that are observales
  notification$ = this.notificationSubject.asObservable(); 

  //method to trigger notifications
  notify(notification:any){
    this.notificationSubject.next(notification); // push notifications to subscribers
  }

}
