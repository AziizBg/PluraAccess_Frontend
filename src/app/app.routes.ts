import { Routes } from '@angular/router';
import { LicencesComponent } from './pages/licences/licences.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'licences', component:LicencesComponent},
    {path:'sessions', loadComponent:()=>import('./pages/sessions/sessions.component').then(m=>m.SessionsComponent)},
    {path:'notifications', loadComponent:()=>import('./pages/notifications/notifications.component').then(m=>m.NotificationsComponent)}
];
