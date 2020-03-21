import { NgModule } from '@angular/core';
import { ServicePageComponent } from './service-page.component';
import { ComponentsModule, TextComponentModule, ButtonComponentModule, ServiceListComponentModule } from '@kk/components';
import { CommonModule } from '@angular/common';
import { ServicePageRoutingModule } from './service-page-routing.module';

@NgModule({
  declarations: [ServicePageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    ServicePageRoutingModule,
    TextComponentModule,
    ButtonComponentModule,
    ServiceListComponentModule
  ],
  exports: [ServicePageComponent]
})
export class ServicePageComponentModule { }
