import { Component, OnDestroy, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { Licence } from '../../models/licence';
import { ResponseSchema } from '../../dto/response.schema';
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
import { Subscription, take } from 'rxjs';
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
  user: User = { id: -1, userName: '' };
  comment: Comment = allComments.fetching;
  private notificationSubscription: Subscription = new Subscription(); // to manage notification subscription lifecycle

  constructor(
    private licenceService: LicenceService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // load initial data
    this.LoadUserData();
    this.LoadLicencesData();

    // subscribe to notifications
    this.notificationSubscription =
      this.notificationService.notification$.subscribe(
        (notification: Notification) => {
          console.log('notification:', notification);
          this.LoadLicencesData();
          this.LoadQueuePosition();
          if (
            notification.title == 'First in queue' &&
            notification.licenceId
          ) {
            this.LoadUserData();
            this.comment = allComments.first_in_queue;
            this.toastr.success(notification.message);
          }
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
    this.licenceService
      .getPosition(this.user.id)
      .subscribe((position: number) => {
        if (position) {
          this.user.queuePosition = position;
        }
      });
  }

  LoadUserData() {
    this.userService.getAllUser().subscribe((item: any) => {
      this.user = {
        id: item.id,
        userName: item.userName,
        bookedLicenceId: item.bookedLicenceId,
      };
    });
  }

  extendLicence(id: number) {
    this.licenceService.extendLicence(id).subscribe((item: any) => {
      this.toastr.success('Licence Extended');
    });
  }

  takeLicence(id: number, user: User, fromQueue: boolean) {
    this.comment = allComments.requesting;
    this.toastr.info('Requesting Licence ...');
    this.user.isRequesting = true;
    this.licenceService.takeLicence(id, user.id, fromQueue).subscribe(
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
        this.LoadUserData();
      }
    );
  }
  returnLicence(id: number) {
    this.toastr.info('Returning licence');
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
    this.licenceService
      .bookLicence(this.user.id)
      .subscribe((position: number) => {
        this.toastr.success('Added to the queue!', '');
        console.log(position);
        this.user.queuePosition = position;
      });
  }
  //exit the waiting queue while waiting
  cancelBookLicence() {
    this.licenceService
      .cancelBookLicence(this.user.id)
      .subscribe((response: any) => {
        this.LoadLicencesData();
        this.toastr.info('Booking Canceled');
      });
  }

  //exit the waiting queue when client is first in the queue and gets a notification to take a licence
  //could be because he chose to or if notification timer ended
  cancelRequestLicence() {
    const id = this.getBookedLicence().id;
    this.licenceService.cancelRequestLicence(id).subscribe((response: any) => {
      this.LoadLicencesData();
      this.toastr.info('Booking Canceled');
    });
  }

  getBookedLicence() {
    return this.data.filter(
      (licence) => licence.bookedByUserId == this.user.id
    )[0];
  }

  isUserStudying() {
    const userSessions = this.data
      .filter((licence) => licence.currentSession)
      .filter((licence) => licence.currentSession?.user?.id == this.user.id);
    return userSessions.length > 0;
  }

  areLicencesAvailable() {
    return (
      this.data.filter(
        (licence) => !licence.currentSession && !licence.bookedByUserId
      ).length > 0
    );
  }

  checkUserState() {
    //check if user is learning
    if (this.isUserStudying()) {
      this.user.isStudying = true;
      this.comment = allComments.learning;
      return;
    }
    //look for available licences only
    if (this.areLicencesAvailable()) {
      this.comment = allComments.available;
      return;
    }
    // check if user is in queue
    this.licenceService
      .getPosition(this.user.id)
      .subscribe((position: number) => {
        // if in queue
        if (position) {
          this.user.queuePosition = position;
          console.log(this.user);
          
          // if user has a booked licence (first in queue)
          if (this.user.bookedLicenceId) {
            this.comment = allComments.first_in_queue;
          } else {
            this.comment = allComments.booked;
          }
        } else {
          if (!this.areLicencesAvailable())
            this.comment = allComments.unavailable;
        }
      });
  }
}
