import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuheaderComponent } from './components/shared/menuheader/menuheader.component';
import { MaterialModule } from '../module/Material.Module';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuheaderComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PluraAccess';
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const ngrokUrl = urlParams.get('ngrokUrl');
    if (ngrokUrl) {
      // Store the ngrok URL in a cookie
      this.cookieService.set('ngrokUrl', ngrokUrl);
      console.log("ngrok URL stored in cookie:", this.cookieService.get('ngrokUrl'));
      
    }
  }

}
