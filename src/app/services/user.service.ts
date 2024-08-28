import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUser(id:number) {
    return this.http.get('https://localhost:7189/api/User/' + id);
  }

  login(dto:LoginDto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      'https://localhost:7189/api/User/login/',
      {
        Email: dto.email,
        Password: dto.password
      },
      { headers }
    );
  }
  register(dto:RegisterDto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      'https://localhost:7189/api/User/register/',
      {
        Email: dto.email,
        Password: dto.password,
        UserName: dto.userName,
        Role:dto.email,
      },
      { headers }
    );
  }
}
