import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../module/Material.Module';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../models/comment';
import { allComments } from '../../../data/all-comments';
import { User } from '../../../models/user';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input()
  user:User|undefined;
  @Input()
  comment:Comment|undefined;
  @Output() bookLicenceEvent = new EventEmitter();
  @Output() cancelBookLicenceEvent = new EventEmitter();
  @Output() cancelRequestLicenceEvent = new EventEmitter();


  allcomments = allComments;
  bookLicence(){
    this.bookLicenceEvent.emit();
  }
  cancelBookLicence(){
    this.cancelBookLicenceEvent.emit();
  }
  cancelRequestLicence(){
    this.cancelRequestLicenceEvent.emit();
  }

}
