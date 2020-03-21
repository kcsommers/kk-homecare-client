import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AuthGuard } from '@kk/core';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { AdminMessagesPageComponent } from './pages/admin-messages-page/admin-messages-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'invoices',
        component: InvoicePageComponent
      },
      {
        path: 'messages',
        component: AdminMessagesPageComponent
      }
    ]
  },
  {
    path: 'login',
    component: AdminLoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminRoutingModule { }
