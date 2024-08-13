import { Component } from '@angular/core';
import { MaterialModule } from '../../../module/Material.Module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
