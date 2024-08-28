import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  getUser(id: number) {
    return this.http.get('https://localhost:7189/api/User/' + id);
  }

  login(dto: LoginDto) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post(
        'https://localhost:7189/api/User/login/',
        {
          Email: dto.email,
          Password: dto.password,
        },
        { headers }
      )
      .pipe(
        tap((response: any) => {
          this.setToken(response.token);
          this.userSubject.next(this.getConnectedUser());
        })
      );
  }
  register(dto: RegisterDto) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      'https://localhost:7189/api/User/register/',
      {
        Email: dto.email,
        Password: dto.password,
        UserName: dto.userName,
        Role: dto.email,
      },
      { headers }
    );
  }

  getToken() {
    return this.cookieService.get('identity');
  }
  setToken(token: string) {
    this.cookieService.set('identity', token);
  }

  isLoggedIn() {
    return !!this.cookieService.get('identity');
  }
  getConnectedUser() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    const decoded = jwtHelper.decodeToken(token);
    const user: User = {
      userName: decoded.unique_name,
      role: decoded.role,
      id: decoded.nameid,
    };
    return user;
  }

  logOut() {
    this.cookieService.delete('identity');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  getUserObservable(){
    return this.userSubject.asObservable();
  }
}
