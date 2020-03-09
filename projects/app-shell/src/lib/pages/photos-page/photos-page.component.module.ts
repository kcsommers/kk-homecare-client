import { NgModule } from '@angular/core';
import { PhotosPageComponent } from './photos-page.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { PhotosPageRoutingModule } from './photos-page-routing.module';

@NgModule({
  declarations: [PhotosPageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    PhotosPageRoutingModule
  ],
  exports: [PhotosPageComponent]
})
export class PhotosPageComponentModule { }
