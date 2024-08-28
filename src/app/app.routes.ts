import { Routes } from '@angular/router';
import { LicencesComponent } from './pages/licences/licences.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'licences',
    component:LicencesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sessions',
    loadComponent: () =>
      import('./pages/sessions/sessions.component').then(
        (m) => m.SessionsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./pages/notifications/notifications.component').then(
        (m) => m.NotificationsComponent
      ),
    canActivate: [AuthGuard],
  },
];
