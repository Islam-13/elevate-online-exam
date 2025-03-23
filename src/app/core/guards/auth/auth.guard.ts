import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction } from '../../../store/isLogged.actions';

export const authGuard: CanActivateFn = (route, state) => {
  const _platformID = inject(PLATFORM_ID);
  const _router = inject(Router);
  const _store = inject(Store);

  if (isPlatformBrowser(_platformID)) {
    const token = localStorage.getItem('loggedToken');
    if (token) {
      _store.dispatch(loginAction({ value: token }));
      return true;
    } else {
      _router.navigate(['/auth/login']);
      return false;
    }
  }

  return false;
};
