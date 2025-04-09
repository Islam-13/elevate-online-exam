import { AbstractControl } from '@angular/forms';

export function equalValues(form: AbstractControl) {
  const password = form.get('password')?.value;
  const rePassword = form.get('rePassword')?.value;

  if (password === rePassword) return null;

  return { misMatch: true };
}
