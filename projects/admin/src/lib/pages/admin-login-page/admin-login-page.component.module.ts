import { NgModule } from '@angular/core';
import { TextComponentModule, ButtonComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { AdminLoginPageComponent } from './admin-login-page.component';
import { FormsModule } from '@angular/forms';
import { AdminLoginPageRoutingModule } from './admin-login-page-routing.module';

@NgModule({
  declarations: [AdminLoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    TextComponentModule,
    AdminLoginPageRoutingModule,
    ButtonComponentModule
  ],
  exports: [AdminLoginPageComponent]
})
export class AdminLoginPageComponentModule { }
