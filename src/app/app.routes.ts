import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './core/auth/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/auth/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            './core/auth/pages/forget-password/forget-password.component'
          ).then((c) => c.ForgetPasswordComponent),
      },
      {
        path: 'verify-code',
        loadComponent: () =>
          import('./core/auth/pages/verify-code/verify-code.component').then(
            (c) => c.VerifyCodeComponent
          ),
      },
      {
        path: 'set-password',
        loadComponent: () =>
          import('./core/auth/pages/set-password/set-password.component').then(
            (c) => c.SetPasswordComponent
          ),
      },
    ],
  },
  { path: '', component: AppComponent },
];
