import { NgModule } from '@angular/core';
import { ContactPageComponent } from './contact-page.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { ContactPageRoutingModule } from './contact-page-routing.module';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    ContactPageRoutingModule
  ],
  exports: [ContactPageComponent]
})
export class ContactPageComponentModule { }
