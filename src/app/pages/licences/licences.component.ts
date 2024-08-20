import { Component, OnDestroy, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { Licence } from '../../models/licence';
import { ResponseSchema } from '../../models/response.schema';
import { MaterialModule } from '../../../module/Material.Module';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { LicenceComponent } from '../../components/licences/licence/licence.component';
import { User } from '../../models/user';
import { CommentsComponent } from '../../components/licences/comments/comments.component';
import { UserService } from '../../services/user.service';
import { Comment } from '../../models/comment';
import { allComments } from '../../data/all-comments';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Notification } from '../../models/notification';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-licences',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    DataViewModule,
    LicenceComponent,
    CommentsComponent,
  ],
  templateUrl: './licences.component.html',
  styleUrl: './licences.component.css',
})
export class LicencesComponent implements OnInit, OnDestroy {
  data: Licence[] = [];
  user: User = { id: -1, name: '' };
  comment: Comment = allComments.fetching;
  private notificationSubscription: Subscription = new Subscription(); // to manage notification subscription lifecycle

  constructor(
    private licenceService: LicenceService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private cookieService:CookieService
  ) {}

  ngOnInit(): void {
    this.LoadUsersData();
    this.LoadLicencesData();
    this.notificationSubscription =
      this.notificationService.notification$.subscribe(
        (notification: Notification) => {
          console.log('notification:', notification);
          if (
            notification.userId != this.user.id &&
            // notification.title != 'Queue' &&
            notification.title != 'Licence Request Failed'
          ) {
            this.toastr.info(notification.message);
          }
          if (
            // notification.userId == this.user.id &&
            notification.title == 'Queue'
          )
            this.toastr.success(notification.message);

          this.LoadLicencesData();
          this.LoadQueuePosition();
        }
      );
  }
  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
  LoadLicencesData() {
    this.licenceService.getAll().subscribe((item: ResponseSchema) => {
      this.data = item.$values;
      this.checkUserState();
    });
  }
  LoadQueuePosition() {
    this.licenceService.getPosition(this.user).subscribe((position: number) => {
      if (position) {
        this.user.queuePosition = position;
      }
    });
  }

  LoadUsersData() {
    this.user.id=+this.cookieService.get("id");
    this.userService.getUser(this.user.id).subscribe((item: any) => {
      this.user = {
        id: item.id,
        name: item.name,
      };
    });
  }

  takeLicence(id: number, user: User) {
    // this.comment = allComments.requesting;
    this.user.isRequesting = true;
    this.licenceService.takeLicence(id, user).subscribe(
      (item: ResponseSchema) => {
        this.user.isStudying = true;
        this.user.isRequesting = false;
        this.comment = allComments.learning;
        this.LoadLicencesData();
        this.toastr.success('Licence Taken. Learn well !', '');
      },
      (error) => {
        this.toastr.error('Licence Request Failed', '');
        this.LoadLicencesData();
        this.LoadUsersData();
      }
    );
  }
  returnLicence(id: number) {
    this.comment = allComments.returning;
    this.licenceService.returnLicence(id).subscribe((item: ResponseSchema) => {
      this.user.isStudying = false;
      this.LoadLicencesData();
      console.log('item: ', item);
      this.router.navigate(['/sessions']);
      this.toastr.warning("Don't forget to add the session title and notes ");
      this.toastr.success('Licence Returned!', '');
    });
  }
  bookLicence() {
    this.comment = allComments.booked;
    this.licenceService.bookLicence(this.user).subscribe((position: number) => {
      this.toastr.success('Added to the queue!', '');
      console.log(position);
      this.user.queuePosition = position;
    });
  }
  cancelBookLicence() {
    this.licenceService
      .cancelBookLicence(this.user)
      .subscribe((response: any) => {
        this.LoadLicencesData();
        this.toastr.info('Booking Canceled');
      });
  }
  checkUserState() {
    //check if user is learning
    const userSessions = this.data
      .filter((licence) => licence.currentSession)
      .filter((licence) => licence.currentSession?.user?.id == this.user.id);
    if (userSessions.length > 0) {
      this.user.isStudying = true;
      this.comment = allComments.learning;
      return;
    }

    // check if user is in queue
    this.licenceService.getPosition(this.user).subscribe((position: number) => {
      if (position) {
        this.user.queuePosition = position;
        this.comment = allComments.booked;
      } else {
        //check if licences are available
        if (this.data.filter((licence) => !licence.currentSession).length > 0)
          this.comment = allComments.available;
        else this.comment = allComments.unavailable;
      }
    });
  }
}
