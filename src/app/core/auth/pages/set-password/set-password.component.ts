import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CtrlErrComponent } from '../../components/ctrl-err/ctrl-err.component';
import { CtrlPasswordErrComponent } from '../../components/ctrl-password-err/ctrl-password-err.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'authApi';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { env } from '../../../../env/env.dev';
import { ToastService } from '../../../../shared/services/toast.service';
import { SubmitBtnComponent } from '../../../../shared/ui/submit-btn/submit-btn.component';
import { loginAction } from '../../../../store/isLogged.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-set-password',
  imports: [
    CtrlErrComponent,
    CtrlPasswordErrComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
})
export class SetPasswordComponent implements OnInit {
  form!: FormGroup;
  showPassword = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  private _authApi = inject(AuthApiService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private _toast = inject(ToastService);
  private _store = inject(Store);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(env.passwordRG),
      ]),
    });
  }

  togglePassword() {
    this.showPassword.update((p) => !p);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);

      const subscription = this._authApi
        .resetPassword(this.form.value)
        .subscribe({
          next: (res) => {
            timer(4000).subscribe(() => this._toast.message.set(''));
            this._toast.type.set('success');
            this._toast.message.set('Password has been reset successfully!');

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
            this.form.reset();
            this.isSubmitting.set(false);
          },
        });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
