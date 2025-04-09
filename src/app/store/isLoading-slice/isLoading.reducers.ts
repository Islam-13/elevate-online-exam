import { createReducer, on } from '@ngrx/store';
import { callingApi, callingApiEnd } from './isLoading.actions';

const initialState: boolean = false;

export const isLoadingReducer = createReducer(
  initialState,
  on(callingApi, (state) => true),
  on(callingApiEnd, (state) => false)
);
