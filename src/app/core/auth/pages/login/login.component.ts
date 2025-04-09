import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiService } from 'authApi';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { timer } from 'rxjs';

import { ToastService } from '../../../../shared/services/toast.service';
import { SubmitBtnComponent } from '../../../../shared/ui/submit-btn/submit-btn.component';
import { loginAction } from '../../../../store/isLogged-slice/isLogged.actions';
import { env } from '../../../../env/env.dev';
import { CtrlPasswordErrComponent } from '../../../../shared/ui/ctrl-password-err/ctrl-password-err.component';
import { CtrlErrComponent } from '../../../../shared/ui/ctrl-err/ctrl-err.component';

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
  private _toast = inject(ToastService);
  private _store = inject(Store);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(env.passwordRG),
      ]),
    });
  }

  togglePassword() {
    this.showPassword.update((p) => !p);
  }

  onSubmit() {
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
          this._store.dispatch(loginAction({ value: res.token }));

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
