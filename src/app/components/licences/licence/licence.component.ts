import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CountdownModule } from 'ngx-countdown';
import { Licence } from '../../../models/licence';
import { CommonModule } from '@angular/common';
import { ResponseSchema } from '../../../models/response.schema';
import { User } from '../../../models/user';
import { LicenceService } from '../../../services/licence.service';


@Component({
  selector: 'app-licence',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CountdownModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './licence.component.html',
  styleUrl: './licence.component.css'
})
export class LicenceComponent implements OnInit, OnChanges {
  @Input() licence: Licence|undefined;
  @Input() user: User|undefined;
  @Output() takeLicenceEvent = new EventEmitter<{id:number, user:User}>();
  @Output() returnLicenceEvent = new EventEmitter<{id:number}>();
  countdownConfig: any;

  constructor(private service:LicenceService){}

  ngOnInit(): void {
    this.updateCountdownConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['licence']) {
      this.updateCountdownConfig();
    }
  }

  updateCountdownConfig(): void {
    if (this.licence && this.licence.currentSession) {
      const endTime: number = new Date(this.licence.currentSession.endTime).getTime();
      this.countdownConfig = { leftTime: (endTime - Date.now()) / 1000 }; // Convert milliseconds to seconds
    }
  }

  takeLicence(id:number, user:User){
    this.takeLicenceEvent.emit({id, user});
  }

  returnLicence(id:number){
    this.returnLicenceEvent.emit({id});
  }

  
}
