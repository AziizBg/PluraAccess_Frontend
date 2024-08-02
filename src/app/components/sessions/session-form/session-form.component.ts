import { Component, OnInit, inject, model } from '@angular/core';
import { MaterialModule } from '../../../../module/Material.Module';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../session/session.component';
import { Session } from '../../../models/session';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.css',
})
export class SessionFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<SessionFormComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  session: Session|undefined;
  form_data: {course:string, userNotes:string}={course:"", userNotes:""}
  ngOnInit(): void {
    console.log("data:" ,this.data);
    this.session=this.data.session;
  }

}
