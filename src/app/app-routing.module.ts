import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpComponent } from './emp/emp.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'dashboard',
    canActivate:[AuthGuard],
    component: DashboardComponent,
  },
  { path: 'employee/:id', component: EmpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
