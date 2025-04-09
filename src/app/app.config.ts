import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

import { isLoggedReducer } from './store/isLogged-slice/isLogged.reducers';
import { isLoadingReducer } from './store/isLoading-slice/isLoading.reducers';
import { examQuestionsReducer } from './store/examQuestions-slice/examQuestions.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore({
      isLogged: isLoggedReducer,
      isLoading: isLoadingReducer,
      examQuestions: examQuestionsReducer,
    }),
  ],
};
