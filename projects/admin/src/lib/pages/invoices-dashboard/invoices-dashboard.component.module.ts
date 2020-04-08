import { NgModule } from '@angular/core';
import { TextComponentModule, ButtonComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { InvoicesDashboardComponent } from './invoices-dashboard.component';
import { InvoicesDashboardRoutingModule } from './invoices-dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [InvoicesDashboardComponent],
  imports: [
    CommonModule,
    TextComponentModule,
    InvoicesDashboardRoutingModule,
    ButtonComponentModule,
    FontAwesomeModule,
    MatSelectModule
  ],
  exports: [InvoicesDashboardComponent]
})
export class InvoicesDashboardComponentModule { }
