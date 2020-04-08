import { NgModule } from '@angular/core';
import { TextComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { AdminMessagesPageComponent } from './admin-messages-page.component';
import { AdminMessagesPageRoutingModule } from './admin-messages-page-routing.module';
import { AdminMessageComponentModule } from '../../components/admin-messages/admin-message.component.module';

@NgModule({
  declarations: [AdminMessagesPageComponent],
  imports: [
    CommonModule,
    TextComponentModule,
    AdminMessagesPageRoutingModule,
    AdminMessageComponentModule
  ],
  exports: [AdminMessagesPageComponent]
})
export class AdminMessagesPageComponentModule { }
