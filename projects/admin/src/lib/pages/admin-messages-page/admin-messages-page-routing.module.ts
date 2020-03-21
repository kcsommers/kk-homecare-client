import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminMessagesPageComponent } from './admin-messages-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminMessagesPageComponent
    }
  ])],
  exports: [RouterModule]
})
export class AdminMessagesPageRoutingModule { }
