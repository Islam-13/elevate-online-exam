import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _platformID = inject(PLATFORM_ID);
  const _router = inject(Router);

  if (isPlatformBrowser(_platformID)) {
    if (localStorage.getItem('loggedToken')) {
      return true;
    } else {
      _router.navigate(['/auth/login']);
      return false;
    }
  }

  return false;
};
