import { NgModule } from '@angular/core';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminPageComponent, AdminLoginPageComponent],
  imports: [
    AdminRoutingModule
  ],
  exports: []
})
export class AdminModule { }
