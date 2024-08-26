import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseSchema } from '../models/response.schema';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponseSchema } from '../models/paginated-response.schema';
import { PaginationDto } from '../models/pagination';

@Injectable({
  providedIn: 'root',
})
//this is a shared service takes notifications from signalr service to other services
export class NotificationService {
  constructor(private http: HttpClient) {}
  private notificationSubject = new Subject<any>(); //a subject that acts as an event bus for notifications

  // observable to allow components to subscribe and listen to notifications
  // the $ suffix is a naming convention for variables that are observales
  notification$ = this.notificationSubject.asObservable();

  //method to trigger notifications
  notify(notification: any) {
    this.notificationSubject.next(notification); // push notifications to subscribers
  }

  // get all user notifications
  getAll(user_id: number, pagination: PaginationDto) {
    let params = new HttpParams();

    // Check if pageIndex is not null or undefined
    params =
      pagination.pageIndex != null
        ? params.set('pageIndex', pagination.pageIndex)
        : params;
    params =
      pagination.pageSize != null
        ? params.set('pageSize', pagination.pageSize)
        : params;

    return this.http.get<PaginatedResponseSchema>(
      'https://localhost:7189/api/Notification/user/' + user_id,
      { params }
    );
  }
}
