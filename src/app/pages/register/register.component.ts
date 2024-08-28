import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../module/Material.Module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDto } from '../../dto/register.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('new user', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('new@oddo-bhf.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  usernameErrorMessage = signal('');
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  confirmPasswordErrorMessage = signal('');
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    merge(this.registerForm.get('username')?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateUsernameErrorMessage());

    merge(this.registerForm.get('email')?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.registerForm.get('password')?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());

    merge(this.registerForm.get('confirmPassword')?.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateConfirmPasswordErrorMessage());
  }

  updateUsernameErrorMessage() {
    if (this.registerForm.get('username')?.hasError('required')) {
      this.usernameErrorMessage.set('You must enter a username');
    } else if (this.registerForm.get('username')?.hasError('minlength')) {
      this.usernameErrorMessage.set('Username is too short');
    } else {
      this.usernameErrorMessage.set('');
    }
  }

  updateEmailErrorMessage() {
    if (this.registerForm.get('email')?.hasError('required')) {
      this.emailErrorMessage.set('You must enter an email');
    } else if (this.registerForm.get('email')?.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    this.passwordErrorMessage.set('');

    if (this.registerForm.get('password')?.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a password');
    }
    if (this.registerForm.get('password')?.hasError('minlength')) {
      this.passwordErrorMessage.set('Password is too short');
    } else if (
      this.registerForm.get('confirmPassword')?.value &&
      this.registerForm.get('confirmPassword')?.value !=
        this.registerForm.get('password')?.value
    ) {
      this.passwordErrorMessage.set("Passwords don't match");
    }
  }

  updateConfirmPasswordErrorMessage() {
    this.updatePasswordErrorMessage();
    if (this.registerForm.get('confirmPassword')?.hasError('required')) {
      this.confirmPasswordErrorMessage.set('You must confirm your password');
    } else if (
      this.registerForm.get('confirmPassword')?.value !=
      this.registerForm.get('password')?.value
    ) {
      this.registerForm.get('confirmPassword')?.setErrors({
        passwordMismatch: true,
      });
      this.confirmPasswordErrorMessage.set('Passwords do not match');
    } else {
      this.confirmPasswordErrorMessage.set('');
    }
    console.log(this.confirmPasswordErrorMessage());
  }

  togglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  toggleConfirmPasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }
  onSubmit() {
    this.updateUsernameErrorMessage();
    this.updateEmailErrorMessage();
    this.updateConfirmPasswordErrorMessage();

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('formdata:', formData);
      const registerDto: RegisterDto = {
        email: formData.email ?? '',
        password: formData.password ?? '',
        userName: formData.username ?? '',
      };
      this.userService.register(registerDto).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success(response.message);
          this.router.navigate(["/"])
        },
        (error: any) => {
          console.log(error);
          this.toastr.error(error.error);
        }
      );
    } else {
      console.log(this.registerForm.errors);
      console.log(this.registerForm.get('username')?.errors);
      console.log(this.registerForm.get('email')?.errors);
      console.log(this.registerForm.get('password')?.errors);
      console.log(this.registerForm.get('confirmPassword')?.errors);
    }
  }
}
