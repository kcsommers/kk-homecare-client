import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: ContactPageComponent
    }
  ])],
  exports: [RouterModule]
})
export class ContactPageRoutingModule { }
