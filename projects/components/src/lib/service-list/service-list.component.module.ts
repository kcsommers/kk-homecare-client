import { NgModule } from '@angular/core';
import { ServiceListComponent } from './service-list.component';
import { TextComponentModule } from '../text/text.component.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ServiceListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    TextComponentModule
  ],
  exports: [ServiceListComponent]
})
export class ServiceListComponentModule { }
