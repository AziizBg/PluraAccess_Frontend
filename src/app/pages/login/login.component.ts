import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../module/Material.Module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import { merge } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDto } from '../../dto/login.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('example@oddo-bhf.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    merge(this.loginForm.get('email')?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.loginForm.get('password')?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  // password
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updatePasswordErrorMessage() {
    if (this.loginForm.get('password')?.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value');
    } else if (this.loginForm.get('password')?.hasError('minlength')) {
      this.passwordErrorMessage.set('Password is too short');
    }
  }

  onSubmit() {
    this.updateEmailErrorMessage();
    this.updatePasswordErrorMessage();

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('formdata:', formData);
      const loginDto: LoginDto = {
        email: formData.email ?? '',
        password: formData.password ?? '',
      };
      this.userService.login(loginDto).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success(response.message);
          this.router.navigate(["licences"])
        },
        (error: any) => {
          console.log(error);
          this.toastr.error(error.error);
        }
      );
    } else {
      console.log(this.loginForm.errors);
      console.log(this.loginForm.get('email')?.errors);
      console.log(this.loginForm.get('password')?.errors);
    }
  }
}
