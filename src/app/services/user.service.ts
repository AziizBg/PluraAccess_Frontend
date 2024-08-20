import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSchema } from '../models/response.schema';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUser(id:number) {
    return this.http.get('https://localhost:7189/api/User/' + id);
  }
}

