import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { ComponentsModule, ServiceListComponentModule, TextComponentModule, ServiceCardComponentModule, ButtonComponentModule, TestimonialsComponentModule, ContactFormComponentModule } from '@kk/components';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    HomePageRoutingModule,
    ServiceListComponentModule,
    TextComponentModule,
    ServiceCardComponentModule,
    ButtonComponentModule,
    TestimonialsComponentModule,
    ContactFormComponentModule
  ],
  exports: [HomePageComponent]
})
export class HomePageComponentModule { }
