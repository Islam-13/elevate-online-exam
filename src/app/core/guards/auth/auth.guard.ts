import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction } from '../../../store/isLogged-slice/isLogged.actions';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _store = inject(Store);
  const _storageManager = inject(LocalStorageService);

  const token = _storageManager.get('loggedToken');

  if (token) {
    _store.dispatch(loginAction({ value: token }));
    return true;
  } else {
    _router.navigate(['/auth/login']);
    return false;
  }
};
