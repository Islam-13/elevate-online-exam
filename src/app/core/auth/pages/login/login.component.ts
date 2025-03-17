import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'authApi';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CtrlPasswordErrComponent } from '../../components/ctrl-password-err/ctrl-password-err.component';
import { CtrlErrComponent } from '../../components/ctrl-err/ctrl-err.component';
import { LoggedUserService } from '../../../services/logged-user.service';
import { timer } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';
import { SubmitBtnComponent } from '../../../../shared/ui/submit-btn/submit-btn.component';

const passwordRG =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CtrlPasswordErrComponent,
    CtrlErrComponent,
    SubmitBtnComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  private _authApi = inject(AuthApiService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private _loggedUser = inject(LoggedUserService);
  private _toast = inject(ToastService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordRG),
      ]),
    });
  }

  togglePassword() {
    this.showPassword.update((p) => !p);
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);

      const subscription = this._authApi.login(this.loginForm.value).subscribe({
        next: (res) => {
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.type.set('success');
          this._toast.message.set('Logged in successfully!');

          localStorage.setItem('loggedToken', res.token);
          this._loggedUser.saveUser();

          this._router.navigate(['/']);
        },
        error: (err) => {
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.type.set('error');
          this._toast.message.set(err.message);

          this.isSubmitting.set(false);
        },
        complete: () => {
          this.loginForm.reset();
          this.isSubmitting.set(false);
        },
      });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
