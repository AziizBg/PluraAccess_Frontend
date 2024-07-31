import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuheaderComponent } from './components/shared/menuheader/menuheader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuheaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PluraAccess_Frontend';
}
