import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../../module/Material.Module';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menuheader',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './menuheader.component.html',
  styleUrl: './menuheader.component.css',
})
export class MenuheaderComponent {
  constructor(private userService: UserService, private toastr:ToastrService) {}
  logOut() {
    this.toastr.success("See you back soon")
    this.userService.logOut();
  }
}
