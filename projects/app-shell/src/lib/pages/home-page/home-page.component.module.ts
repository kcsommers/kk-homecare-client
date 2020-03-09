import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    HomePageRoutingModule
  ],
  exports: [HomePageComponent]
})
export class HomePageComponentModule { }
