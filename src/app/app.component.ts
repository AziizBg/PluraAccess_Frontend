import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuheaderComponent } from './components/shared/menuheader/menuheader.component';
import { MaterialModule } from '../module/Material.Module';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SignalrService } from './services/signalr.service';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuheaderComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'PluraAccess';
  showHeader = true;
  user$!: Observable<User | null>;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private singlarService: SignalrService,
    private userService: UserService
  ) {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    this.user$ = userService.getUserObservable();
  }

  checkRoute() {
    const currentRoute = this.router.url;
    this.showHeader = currentRoute != '/' && currentRoute != '/register';
  }

  ngOnInit(): void {
    this.showHeader = window.location.pathname == '/';

    const urlParams = new URLSearchParams(window.location.search);
    this.user$.subscribe((user) => {
      if (user) {
        const userId = this.userService.getConnectedUser().id;
        this.singlarService.startConnection(+this.cookieService.get('id'));
        this.singlarService.addListener();
      }
    });
  }
}
