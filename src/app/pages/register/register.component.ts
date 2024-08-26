import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../module/Material.Module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Username
  readonly username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  usernameErrorMessage = signal('');

  // Email
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  emailErrorMessage = signal('');

  // Password
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  passwordErrorMessage = signal('');

  // Confirm Password
  readonly confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirmPasswordErrorMessage = signal('');

  // Control password visibility
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  constructor() {
    merge(this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateUsernameErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());

    merge(this.confirmPassword.statusChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateConfirmPasswordErrorMessage());
  }

  updateUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      this.usernameErrorMessage.set('You must enter a username');
    } else if (this.username.hasError('minlength')) {
      this.usernameErrorMessage.set('Username is too short');
    } else {
      this.usernameErrorMessage.set('');
    }
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter an email');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a password');
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage.set('Password is too short');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  updateConfirmPasswordErrorMessage() {
    if (this.confirmPassword.hasError('required')) {
      this.confirmPasswordErrorMessage.set('You must confirm your password');
    } else if (this.confirmPassword.value !== this.password.value) {
      console.log('false');
      this.confirmPasswordErrorMessage.set('Passwords do not match');
    } else {
      this.confirmPasswordErrorMessage.set('');
    }
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  toggleConfirmPasswordVisibility(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }
}
