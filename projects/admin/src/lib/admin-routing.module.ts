import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AuthGuard } from '@kk/core';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AdminLoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
