import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../module/Material.Module';
import { Notification } from '../../../models/notification';

@Component({
  selector: 'app-notifiation',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './notifiation.component.html',
  styleUrl: './notifiation.component.css',
})
export class NotificationComponent {
  @Input() notifiation: Notification | undefined;

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
