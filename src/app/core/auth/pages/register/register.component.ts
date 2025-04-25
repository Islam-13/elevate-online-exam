import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'authApi';
import { timer } from 'rxjs';

import { env } from '../../../../env/env.dev';
import { ToastService } from '@shared/services/toast.service';
import { SubmitBtnComponent } from '@shared/ui/submit-btn/submit-btn.component';
import { CtrlErrComponent } from '@shared/ui/ctrl-err/ctrl-err.component';
import { CtrlPasswordErrComponent } from '@shared/ui/ctrl-password-err/ctrl-password-err.component';
import { equalValues } from '@shared/utils/validateRePassword';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CtrlErrComponent,
    CtrlPasswordErrComponent,
    SubmitBtnComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  showPassword = signal<boolean>(false);
  showRePassword = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  private _authApi = inject(AuthApiService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(env.passwordRG),
        ]),
        rePassword: new FormControl('', [Validators.required]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(env.PhoneRG),
        ]),
      },
      {
        validators: [
          (control) => equalValues(control, 'password', 'rePassword'),
        ],
      }
    );
  }

  togglePassword() {
    this.showPassword.update((p) => !p);
  }

  toggleRePassword() {
    this.showRePassword.update((p) => !p);
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);

      const subscription = this._authApi
        .register(this.registerForm.value)
        .subscribe({
          next: (res) => {
            timer(4000).subscribe(() => this._toast.message.set(''));
            this._toast.type.set('success');
            this._toast.message.set('Account registered successfully!');

            this._router.navigate(['/auth/login']);
          },
          error: (err) => {
            timer(4000).subscribe(() => this._toast.message.set(''));
            this._toast.type.set('error');
            this._toast.message.set(err.message);

            this.isSubmitting.set(false);
          },
          complete: () => {
            this.registerForm.reset();
            this.isSubmitting.set(false);
          },
        });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
