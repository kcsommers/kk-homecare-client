import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { ComponentsModule, ServiceListComponentModule, TextComponentModule, ServiceCardComponentModule, ButtonComponentModule, TestimonialsComponentModule, ContactFormComponentModule } from '@kk/components';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ContactFormComponentModule,
    FontAwesomeModule
  ],
  exports: [HomePageComponent]
})
export class HomePageComponentModule { }
