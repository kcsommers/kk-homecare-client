import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhotosPageComponent } from './photos-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: PhotosPageComponent
    }
  ])],
  exports: [RouterModule]
})
export class PhotosPageRoutingModule { }
