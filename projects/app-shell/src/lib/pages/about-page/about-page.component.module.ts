import { NgModule } from '@angular/core';
import { AboutPageComponent } from './about-page.component';
import { ComponentsModule, TextComponentModule } from '@kk/components';
import { CommonModule } from '@angular/common';
import { AboutPageRoutingModule } from './about-page-routing.module';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    AboutPageRoutingModule,
    TextComponentModule
  ],
  exports: [AboutPageComponent]
})
export class AboutPageComponentModule { }
