import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesPageComponent } from './services-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: ServicesPageComponent
    }
  ])],
  exports: [RouterModule]
})
export class ServicesPageRoutingModule { }
