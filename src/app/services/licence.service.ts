import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Licence } from '../models/licence';
import { ResponseSchema } from '../dto/response.schema';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LicenceService {
  private ngrokUrl: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.ngrokUrl = this.cookieService.get('ngrokUrl');
  }

  getAll() {
    return this.http.get<ResponseSchema>('https://localhost:7189/api/Licence');
  }
  //take an available licence and open pluralsight
  takeLicence(id: number, userId:number, fromQueue:Boolean) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseSchema>(
      'https://localhost:7189/api/Licence/take/' + id ,
      {
        UserId:userId,
        // , NgorkUrl:this.ngrokUrl,
        FromQueue:fromQueue
      },
      { headers }
    );
  }
  //finish session, close browser, return licence
  returnLicence(id: number) {
    return this.http.post<ResponseSchema>(
      'https://localhost:7189/api/Licence/return/' + id,
      { isBrowserClosed: false }
    );
  }

  // extend licence
  extendLicence(id: number){
    return this.http.get(
      'https://localhost:7189/api/Licence/extend/' + id
    )
  }


  //Be added to the waiting queue for future available licences
  bookLicence(userId:number) {
    return this.http.post<number>(
      'https://localhost:7189/api/Queue/',
      { UserId:userId }
    );
  }
  //exit the waiting queue while waiting
  cancelBookLicence(userId:number){
    return this.http.delete(
      'https://localhost:7189/api/Queue/'+userId
    )
  }
  //exit the waiting queue when client is first in the queue and gets a notification to take a licence
  //could be because he chose to or if notification timer ended
  cancelRequestLicence(id: number){
    return this.http.get(
      'https://localhost:7189/api/Licence/cancelBookLicence/'+id
    )
  } 

  getPosition(userId:number){
    return this.http.get<number>(
      'https://localhost:7189/api/Queue/getPosition/'+userId,
    );
  }
}
