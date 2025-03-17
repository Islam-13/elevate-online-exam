import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'authApi';
import { timer } from 'rxjs';
import { CtrlErrComponent } from '../../components/ctrl-err/ctrl-err.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { SubmitBtnComponent } from '../../../../shared/ui/submit-btn/submit-btn.component';

@Component({
  selector: 'app-verify-code',
  imports: [CtrlErrComponent, ReactiveFormsModule, SubmitBtnComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent {
  form!: FormGroup;
  isSubmitting = signal<boolean>(false);

  private _authApi = inject(AuthApiService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
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
          this._router.navigate(['/auth/set-password']);
          timer(4000).subscribe(() => this._toast.message.set(''));
          this._toast.message.set('Code verified successfully!');
          this._toast.type.set('success');
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
}
