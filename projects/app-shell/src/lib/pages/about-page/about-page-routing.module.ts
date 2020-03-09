import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AboutPageComponent
    }
  ])],
  exports: [RouterModule]
})
export class AboutPageRoutingModule { }
