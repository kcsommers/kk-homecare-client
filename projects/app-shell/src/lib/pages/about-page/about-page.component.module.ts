import { NgModule } from '@angular/core';
import { AboutPageComponent } from './about-page.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { AboutPageRoutingModule } from './about-page-routing.module';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    AboutPageRoutingModule
  ],
  exports: [AboutPageComponent]
})
export class AboutPageComponentModule { }
