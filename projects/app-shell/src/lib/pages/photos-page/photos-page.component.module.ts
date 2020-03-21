import { NgModule } from '@angular/core';
import { PhotosPageComponent } from './photos-page.component';
import { ComponentsModule, TextComponentModule, ToggleComponentModule, LightboxComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { PhotosPageRoutingModule } from './photos-page-routing.module';

@NgModule({
  declarations: [PhotosPageComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    PhotosPageRoutingModule,
    TextComponentModule,
    ToggleComponentModule,
    LightboxComponentModule
  ],
  exports: [PhotosPageComponent]
})
export class PhotosPageComponentModule { }
