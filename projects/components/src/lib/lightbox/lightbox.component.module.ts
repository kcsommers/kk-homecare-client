import { NgModule } from '@angular/core';
import { LightboxComponent } from './lightbox.component';
import { CommonModule } from '@angular/common';
import { ImageComponentModule } from '../image/image.component.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LightboxComponent],
  imports: [
    CommonModule,
    ImageComponentModule,
    FontAwesomeModule
  ],
  exports: [LightboxComponent]
})
export class LightboxComponentModule { }
