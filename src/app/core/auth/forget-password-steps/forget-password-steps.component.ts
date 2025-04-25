import { Component, signal } from '@angular/core';
import { ForgetPasswordComponent } from '../pages/forget-password/forget-password.component';
import { VerifyCodeComponent } from '../pages/verify-code/verify-code.component';
import { SetPasswordComponent } from '../pages/set-password/set-password.component';
import { Steps } from '@shared/interfaces/forget-password-steps';

@Component({
  selector: 'app-forget-password-steps',
  imports: [ForgetPasswordComponent, VerifyCodeComponent, SetPasswordComponent],
  templateUrl: './forget-password-steps.component.html',
  styleUrl: './forget-password-steps.component.scss',
})
export class ForgetPasswordStepsComponent {
  steps = signal<Steps>('forget-password');

  onChangeSteps(step: Steps) {
    this.steps.set(step);
  }
}
