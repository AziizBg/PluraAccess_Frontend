import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CountdownModule } from 'ngx-countdown';
import { Licence } from '../../../models/licence';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-licence',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CountdownModule, CommonModule],
  templateUrl: './licence.component.html',
  styleUrl: './licence.component.css'
})
export class LicenceComponent implements OnInit, OnChanges {
  @Input() licence: Licence|undefined;
  countdownConfig: any;

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
}
