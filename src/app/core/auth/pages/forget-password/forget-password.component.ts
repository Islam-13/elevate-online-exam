import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'authApi';
import { timer } from 'rxjs';

import { ToastService } from '@shared/services/toast.service';
import { SubmitBtnComponent } from '@shared/ui/submit-btn/submit-btn.component';
import { CtrlErrComponent } from '@shared/ui/ctrl-err/ctrl-err.component';
import { Steps } from '@shared/interfaces/forget-password-steps';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CtrlErrComponent, SubmitBtnComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = signal<boolean>(false);
  steps = output<Steps>();

  private _authApi = inject(AuthApiService);
  private _destroyRef = inject(DestroyRef);
  private _toast = inject(ToastService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);

      const subscription = this._authApi
        .forgetPassword(this.form.value)
        .subscribe({
          next: (res) => {
            timer(4000).subscribe(() => this._toast.message.set(''));
            this._toast.type.set('success');
            this._toast.message.set('Code sent successfully!');

            this.steps.emit('verify-code');
            sessionStorage.setItem('forgetEmail', this.form.value.email);
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
