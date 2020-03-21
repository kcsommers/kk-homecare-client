import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLoginPageComponent } from './admin-login-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminLoginPageComponent
    }
  ])],
  exports: [RouterModule]
})
export class AdminLoginPageRoutingModule { }
