import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'authApi';
import { timer } from 'rxjs';

import { ToastService } from '../../../../shared/services/toast.service';
import { SubmitBtnComponent } from '../../../../shared/ui/submit-btn/submit-btn.component';
import { CtrlErrComponent } from '../../../../shared/ui/ctrl-err/ctrl-err.component';
import { Steps } from '../../../../shared/interfaces/forget-password-steps';

@Component({
  selector: 'app-verify-code',
  imports: [CtrlErrComponent, ReactiveFormsModule, SubmitBtnComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent {
  form!: FormGroup;
  isSubmitting = signal<boolean>(false);
  isResending = signal<boolean>(false);
  steps = output<Steps>();

  private _authApi = inject(AuthApiService);
  private _destroyRef = inject(DestroyRef);
  private _toast = inject(ToastService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      resetCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);

      const subscription = this._authApi.verifyCode(this.form.value).subscribe({
        next: (res) => {
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.message.set('Code verified successfully!');
          this._toast.type.set('success');

          this.steps.emit('set-password');
        },
        error: (err) => {
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.message.set(err.message);
          this._toast.type.set('error');

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

  onResend() {
    const email = sessionStorage.getItem('forgetEmail');

    if (!email) {
      timer(4000).subscribe(() => this._toast.message.set(''));
      this._toast.type.set('error');
      this._toast.message.set('Something went wrong, please provide email!');
      this.steps.emit('forget-password');
    } else {
      this.isResending.set(true);

      const subscription = this._authApi.forgetPassword({ email }).subscribe({
        next: (res) => {
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.type.set('success');
          this._toast.message.set('Code Resent successfully!');
        },
        error: (err) => {
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.type.set('error');
          this._toast.message.set(err.message);

          this.isResending.set(false);
        },
        complete: () => {
          this.form.reset();
          this.isResending.set(false);
        },
      });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
