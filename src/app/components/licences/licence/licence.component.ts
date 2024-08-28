import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';
import { Licence } from '../../../models/licence';
import { CommonModule } from '@angular/common';
import { ResponseSchema } from '../../../dto/response.schema';
import { User } from '../../../models/user';
import { LicenceService } from '../../../services/licence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-licence',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CountdownModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './licence.component.html',
  styleUrl: './licence.component.css',
})
export class LicenceComponent implements OnInit, OnChanges {
  @Input() licence: Licence | undefined;
  @Input() user: User | undefined;
  @Input() licencesAvailable: boolean | undefined;
  @Input() isUserStudying: boolean | undefined;
  @Output() takeLicenceEvent = new EventEmitter<{
    id: number;
    user: User;
    fromQueue: boolean;
  }>();
  @Output() returnLicenceEvent = new EventEmitter<{ id: number }>();
  @Output() timerEndedEvent = new EventEmitter();
  @Output() extendLicenceEvent = new EventEmitter<{ id: number }>();
  sessionCountdownConfig: any;
  bookCountdownConfig: any;
  isExtendable: boolean = false;
  SESSION_DURATION = 120 * 60; //2 hours
  EXTEND_TIME = 60; //60 seconds to be changed to 1h50

  constructor(private service: LicenceService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.updateCountdownConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['licence']) {
      this.updateCountdownConfig();
    }
  }

  updateCountdownConfig(): void {
    //session time left
    if (this.licence && this.licence.currentSession) {
      const endTime: number = new Date(
        this.licence.currentSession.endTime
      ).getTime();
      const leftTime = (endTime - Date.now()) / 1000;
      this.sessionCountdownConfig = {
        leftTime: leftTime,
        notify: this.SESSION_DURATION - this.EXTEND_TIME,
      };
      if (leftTime < this.SESSION_DURATION - this.EXTEND_TIME)
        this.isExtendable = true;
    }
    //Booking time left (first in queue)
    if (this.licence && this.licence.bookedUntil) {
      const bookedUntil: number = new Date(this.licence.bookedUntil).getTime();
      this.bookCountdownConfig = {
        leftTime: (bookedUntil - Date.now()) / 1000,
      };
    }
  }

  takeLicence(id: number, user: User, fromQueue: boolean) {
    this.takeLicenceEvent.emit({ id, user, fromQueue });
  }

  returnLicence(id: number) {
    this.returnLicenceEvent.emit({ id });
  }

  extendLicence(id: number) {
    this.extendLicenceEvent.emit({ id });
  }

  handleBookCountDown(event: CountdownEvent) {
    if (event.action == 'done') this.timerEndedEvent.emit();
  }

  handleSessionCountDown(event: CountdownEvent) {
    if (event.action == 'notify') {
      this.isExtendable = true;
      if (
        this.licence?.currentSession?.user?.id == this.user?.id &&
        this.licencesAvailable
      )
        this.toastr.warning('Extend licence before the timer ends');
    }
  }
}
