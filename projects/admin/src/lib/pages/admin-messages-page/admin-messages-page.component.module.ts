import { NgModule } from '@angular/core';
import { TextComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { AdminMessagesPageComponent } from './admin-messages-page.component';
import { AdminMessagesPageRoutingModule } from './admin-messages-page-routing.module';

@NgModule({
  declarations: [AdminMessagesPageComponent],
  imports: [
    CommonModule,
    TextComponentModule,
    AdminMessagesPageRoutingModule
  ],
  exports: [AdminMessagesPageComponent]
})
export class AdminMessagesPageComponentModule { }
