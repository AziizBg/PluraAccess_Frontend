import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../../../module/Material.Module';
import { Session } from '../../../models/session';
import { MatDialog } from '@angular/material/dialog';
import { SessionFormComponent } from '../session-form/session-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [MaterialModule, SessionFormComponent, CommonModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent {
  @Input() session_data: Session | undefined;
  @Output() editSessionEvent = new EventEmitter<Session>();
  editSession(session: Session) {
    this.editSessionEvent.emit(session);
  }
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(SessionFormComponent, {
      data: {
        form_data: { course: this.session_data?.course||"", userNotes:this.session_data?.userNotes||""}
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result:", result);
      if(this.session_data){
      this.session_data.course= result.course;
      this.session_data.userNotes= result.userNotes;
      this.editSession(this.session_data);
      }
    })
  }
 
  getDate(time: any): string {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString();
    return `${formattedDate}`;
  }
  getTime(time: any): string {
    const date = new Date(time);
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedTime}`;
  }
}

export interface DialogData {
  form_data:{
    course:string, userNotes:string
  }
}
