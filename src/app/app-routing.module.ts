import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpComponent } from './emp/emp.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  // { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'dashboard',
    canActivate:[AuthGuard],
    component: DashboardComponent,
  },
  { path: 'employee', component: EmpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'employee/:id', component: EmpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
