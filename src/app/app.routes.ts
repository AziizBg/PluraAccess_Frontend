import { Routes } from '@angular/router';
import { LicencesComponent } from './pages/licences/licences.component';

export const routes: Routes = [
    {path:'', component:LicencesComponent},
    {path:'sessions', loadComponent:()=>import('./pages/sessions/sessions.component').then(m=>m.SessionsComponent)},
    {path:'notifications', loadComponent:()=>import('./pages/notifications/notifications.component').then(m=>m.NotificationsComponent)}
];
