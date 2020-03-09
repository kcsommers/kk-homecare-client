import { NgModule } from '@angular/core';
import { ServicePageComponent } from './service-page.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { ServicePageRoutingModule } from './service-page-routing.module';

@NgModule({
  declarations: [ServicePageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    ServicePageRoutingModule
  ],
  exports: [ServicePageComponent]
})
export class ServicePageComponentModule { }
