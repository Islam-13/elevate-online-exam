import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';
import { AppLayoutComponent } from './shared/ui/app-layout/app-layout.component';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [loggedUserGuard],
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
            './core/auth/forget-password-steps/forget-password-steps.component'
          ).then((c) => c.ForgetPasswordStepsComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'quizzes/:quizId',
        loadComponent: () =>
          import('./features/pages/exams/exams.component').then(
            (c) => c.ExamsComponent
          ),
      },
    ],
  },
];
