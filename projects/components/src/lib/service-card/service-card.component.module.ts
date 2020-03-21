import { NgModule } from '@angular/core';
import { ServiceCardComponent } from './service-card.component';
import { RouterModule } from '@angular/router';
import { TextComponentModule } from '../text/text.component.module';
import { CommonModule } from '@angular/common';
import { ButtonComponentModule } from '../button/button.component.module';

@NgModule({
  declarations: [ServiceCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    TextComponentModule,
    ButtonComponentModule
  ],
  exports: [ServiceCardComponent]
})
export class ServiceCardComponentModule { }
