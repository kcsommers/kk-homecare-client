import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicePageComponent } from './service-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: ServicePageComponent
    }
  ])],
  exports: [RouterModule]
})
export class ServicePageRoutingModule { }
