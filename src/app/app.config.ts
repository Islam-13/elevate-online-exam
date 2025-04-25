import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { env } from './env/env.dev';
import { isLoggedReducer } from './store/isLogged-slice/isLogged.reducers';
import { isLoadingReducer } from './store/isLoading-slice/isLoading.reducers';
import { examQuestionsReducer } from './store/examQuestions-slice/examQuestions.reducers';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { BASE_URL } from '../../projects/auth-api/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    { provide: BASE_URL, useValue: env.baseURL },
    provideStore({
      isLogged: isLoggedReducer,
      isLoading: isLoadingReducer,
      examQuestions: examQuestionsReducer,
    }),
  ],
};
