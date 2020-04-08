import { NgModule } from '@angular/core';
import { AdminMessageComponent } from './admin-message.component';
import { TextComponentModule } from '@kk/components';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AdminMessageComponent],
  imports: [
    TextComponentModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [AdminMessageComponent]
})
export class AdminMessageComponentModule { }
