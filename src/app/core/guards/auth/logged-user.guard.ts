import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _storageManager = inject(LocalStorageService);

  const token = _storageManager.get('loggedToken');

  if (token) {
    _router.navigate(['/']);
    return false;
  } else return true;
};
