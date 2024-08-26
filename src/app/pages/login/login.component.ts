import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../module/Material.Module';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {merge} from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  // email
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  emailErrorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges,)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
      merge(this.password.statusChanges, this.password.valueChanges,)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  // password
  readonly password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordErrorMessage = signal('');

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value');
    }  else if(this.password.hasError('minlength')){
      this.passwordErrorMessage.set('Password is too short');
    }
  }
}
