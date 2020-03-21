import { NgModule } from '@angular/core';
import { TextComponentModule, ButtonComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { InvoicePageComponent } from './invoice-page.component';
import { InvoicePageRoutingModule } from './invoice-page-routing.module';

@NgModule({
  declarations: [InvoicePageComponent],
  imports: [
    CommonModule,
    TextComponentModule,
    InvoicePageRoutingModule,
    ButtonComponentModule
  ],
  exports: [InvoicePageComponent]
})
export class InvoicePageComponentModule { }
