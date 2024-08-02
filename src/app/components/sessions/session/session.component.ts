import { Component, Input, OnInit, inject } from '@angular/core';
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
export class SessionComponent  {
  @Input() session_data: Session | undefined;
  // session: Session | undefined;
  readonly dialog = inject(MatDialog);

  // ngOnInit(): void {
  //   this.session = this.session_data;
  // }

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
  openDialog() {
    this.dialog.open(SessionFormComponent, { data: { session: this.session_data }, width:"500px"});
  }
}

export interface DialogData {
  session?: Session;
}
