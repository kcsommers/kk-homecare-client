import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponentModule } from '../loading-spinner/loading-spinner.component.module';

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent],
  imports: [
    CommonModule,
    LoadingSpinnerComponentModule,
  ],
  entryComponents: [ImageComponent]
})
export class ImageComponentModule { }
