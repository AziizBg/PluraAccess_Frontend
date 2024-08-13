import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuheaderComponent } from './components/shared/menuheader/menuheader.component';
import { MaterialModule } from '../module/Material.Module';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuheaderComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PluraAccess';
  showHeader = true
  constructor(private cookieService: CookieService, private router:Router) {
    this.router.events.subscribe(()=>{
      this.checkRoute()
    })
   }
   checkRoute(){
    const currentRoute = this.router.url;
    this.showHeader= currentRoute!="/"
   }

  ngOnInit(): void {
    this.showHeader= window.location.pathname=="/"
    const id = this.cookieService.get('id');
    if (!id) this.cookieService.set('id', '1');

    const urlParams = new URLSearchParams(window.location.search);
    const ngrokUrl = urlParams.get('ngrokUrl');
    if (ngrokUrl) {
      // Store the ngrok URL in a cookie
      this.cookieService.set('ngrokUrl', ngrokUrl);
      console.log("ngrok URL stored in cookie:", this.cookieService.get('ngrokUrl')); 
    }
  }

}
