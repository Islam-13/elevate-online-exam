import { createReducer, on } from '@ngrx/store';
import { loginAction, logoutAction } from './isLogged.actions';
import { jwtDecode } from 'jwt-decode';

type TokenDecoded = {
  id: string;
  role: string;
  iat: number;
};

const initialState: TokenDecoded = { id: '', role: '', iat: 0 };

export const isLoggedReducer = createReducer(
  initialState,
  on(loginAction, (state, action) => (state = jwtDecode(action.value))),
  on(logoutAction, () => initialState)
);
