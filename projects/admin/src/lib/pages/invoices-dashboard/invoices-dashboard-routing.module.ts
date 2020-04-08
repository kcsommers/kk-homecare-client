import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicesDashboardComponent } from './invoices-dashboard.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: InvoicesDashboardComponent
    }
  ])],
  exports: [RouterModule]
})
export class InvoicesDashboardRoutingModule { }
