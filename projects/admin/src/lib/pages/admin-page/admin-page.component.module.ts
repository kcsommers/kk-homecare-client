import { NgModule } from '@angular/core';
import { TextComponentModule, ButtonComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    TextComponentModule,
    AdminPageRoutingModule,
    ButtonComponentModule
  ],
  exports: [AdminPageComponent]
})
export class AdminPageComponentModule { }
