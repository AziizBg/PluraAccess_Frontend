import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/Material.Module';
import { NotificationComponent } from '../../components/notifications/notifiation/notifiation.component';
import { PaginatedResponseSchema } from '../../dto/paginated-response.schema';
import { PaginationDto } from '../../dto/pagination';
import { CookieService } from 'ngx-cookie-service';
import { Notification } from '../../models/notification';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { CommentsComponent } from '../../components/licences/comments/comments.component';
import { allComments } from '../../data/all-comments';
import { Comment } from '../../models/comment';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MaterialModule, NotificationComponent, CommonModule, CommentsComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  length: number = 10;
  pageIndex: number = 0;
  pageSize: number = 3;
  data: Notification[] = [];
  comment: Comment = allComments.notifications;


  constructor(
    private readonly cookieService: CookieService,
    private readonly service: NotificationService,
    private readonly userService:UserService
  ) {}

  ngOnInit(): void {
    this.LoadData({ pageIndex: this.pageIndex, pageSize: this.pageSize });
  }

  LoadData(pagination: PaginationDto) {
    const id = this.userService.getConnectedUser().id;
    this.pageSize = pagination.pageSize ? pagination.pageSize : this.pageSize;
    this.pageIndex = pagination.pageIndex
      ? pagination.pageIndex
      : this.pageIndex;
    this.service
      .getAll(id, pagination)
      .subscribe((item: PaginatedResponseSchema) => {
        this.data = item.items.$values;
        this.length = item.length;
        console.log(this.data);
      });
  }
  change(event: PageEvent) {
    this.LoadData({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
}
