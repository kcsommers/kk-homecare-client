import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminPageComponent
    }
  ])],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
