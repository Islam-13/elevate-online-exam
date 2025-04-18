import { AbstractControl } from '@angular/forms';

export function equalValues(form: AbstractControl, val1: string, val2: string) {
  const password = form.get(val1)?.value;
  const rePassword = form.get(val2)?.value;

  if (password === rePassword) return null;

  return { misMatch: true };
}
