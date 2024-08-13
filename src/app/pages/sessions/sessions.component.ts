import { Component, OnInit } from '@angular/core';
import { ResponseSchema } from '../../models/response.schema';
import { SessionService } from '../../services/sessions.service';
import { Session } from '../../models/session';
import { MaterialModule } from '../../../module/Material.Module';
import { CommentsComponent } from '../../components/licences/comments/comments.component';
import { Comment } from '../../models/comment';
import { allComments } from '../../data/all-comments';
import { SessionComponent } from '../../components/sessions/session/session.component';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { PaginationDto } from '../../models/pagination';
import { PaginatedResponseSchema } from '../../models/paginated-response.schema';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, MaterialModule, CommentsComponent, SessionComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent implements OnInit {
  length: number = 10;
  pageIndex: number = 0;
  pageSize: number = 3;
  constructor(private service: SessionService, private cookieService: CookieService) {}
  data: Session[] = [];

  comment: Comment = allComments.sessions;

  ngOnInit(): void {
    this.LoadData({ pageIndex: this.pageIndex, pageSize: this.pageSize });
  }
  LoadData(pagination: PaginationDto) {
    const id = Number(this.cookieService.get('id'));
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
  editSession(session: Session) {
    this.service.editSession(session).subscribe((item: ResponseSchema) => {
      this.LoadData({ pageIndex: this.pageIndex, pageSize: this.pageSize });
    });
  }

  deleteSession(session: Session) {
    if (window.confirm('Do you want to delete the session?')) {
      this.service.deleteSession(session).subscribe((item: ResponseSchema) => {
        this.LoadData({ pageIndex: this.pageIndex, pageSize: this.pageSize });
      });
    }
  }

  change(event: PageEvent) {
    this.LoadData({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
}
