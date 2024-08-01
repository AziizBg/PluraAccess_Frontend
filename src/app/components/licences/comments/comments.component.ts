import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../module/Material.Module';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input()
  name:string|undefined;
  @Input()
  comment:Comment|undefined;

}
