import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Licence } from '../models/licence';
import { ResponseSchema } from '../models/response.schema';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {
  private ngrokUrl: string;


  constructor(private http:HttpClient, private cookieService: CookieService) { 
    this.ngrokUrl = this.cookieService.get('ngrokUrl');

  }

  getAll(){
        return this.http.get<ResponseSchema>('https://localhost:7189/api/Licence');
  }

  takeLicence(id:number, user:User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseSchema>('https://localhost:7189/api/Licence/'+id+'/take', {UserId:user.id
    // , NgorkUrl:this.ngrokUrl
  }, {headers})
  }
  
  returnLicence(id:number){
    return this.http.post<ResponseSchema>('https://localhost:7189/api/Licence/'+id+"/return", {isBrowserClosed:false});

  }
}
