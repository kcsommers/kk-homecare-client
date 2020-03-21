import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicePageComponent } from './invoice-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: InvoicePageComponent
    }
  ])],
  exports: [RouterModule]
})
export class InvoicePageRoutingModule { }
