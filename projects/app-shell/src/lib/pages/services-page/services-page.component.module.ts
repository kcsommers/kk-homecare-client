import { NgModule } from '@angular/core';
import { ServicesPageComponent } from './services-page.component';
import { ComponentsModule, TextComponentModule, ServiceCardComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { ServicesPageRoutingModule } from './services-page-routing.module';

@NgModule({
  declarations: [ServicesPageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    ServicesPageRoutingModule,
    TextComponentModule,
    ServiceCardComponentModule
  ],
  exports: [ServicesPageComponent]
})
export class ServicesPageComponentModule { }
