import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
  '[isLogged] loginAction',
  props<{ value: string }>()
);

export const logoutAction = createAction('[isLogged] logoutAction');
