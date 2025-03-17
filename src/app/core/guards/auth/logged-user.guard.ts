import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const _platformID = inject(PLATFORM_ID);
  const _router = inject(Router);

  if (isPlatformBrowser(_platformID)) {
    if (localStorage.getItem('loggedToken')) {
      _router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  return true;
};
