import { Component, OnInit } from '@angular/core';
import { ResponseSchema } from '../../models/response.schema';
import { SessionService } from '../../services/sessions.service';
import { Session } from '../../models/session';
import { MaterialModule } from '../../../module/Material.Module';
import { USER_ID } from '../../services/user.service';
import { CommentsComponent } from '../../components/licences/comments/comments.component';
import { Comment } from '../../models/comment';
import { allComments } from '../../data/all-comments';
import { SessionComponent } from '../../components/sessions/session/session.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, MaterialModule, CommentsComponent, SessionComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent implements OnInit {
  constructor(private service: SessionService) {}
  data: Session[] = [];

  comment: Comment = allComments.sessions;

  ngOnInit(): void {
    this.LoadInitialData();
  }
  LoadInitialData() {
    console.log('user id:', USER_ID);
    this.service.getAll(USER_ID).subscribe((item: ResponseSchema) => {
      this.data = item.$values.sort(
        (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
      );
      console.log(this.data);
    });
  }
  editSession(session: Session) {
    console.log('edit session:', session);
    this.service.editSession(session).subscribe((item: ResponseSchema) => {
      console.log('item:', item);
      this.LoadInitialData();
    });
  }

  deleteSession(session: Session) {
    if (window.confirm('Do you want to delete the session?')) {
      console.log('delete session:', session);
      this.service.deleteSession(session).subscribe((item: ResponseSchema) => {
        console.log('item:', item);
        this.LoadInitialData();
      });
    }
  }
}
