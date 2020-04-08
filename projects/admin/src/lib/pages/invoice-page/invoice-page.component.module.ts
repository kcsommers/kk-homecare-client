import { NgModule } from '@angular/core';
import { TextComponentModule, ButtonComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { InvoicePageComponent } from './invoice-page.component';
import { InvoicePageRoutingModule } from './invoice-page-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [InvoicePageComponent],
  imports: [
    CommonModule,
    TextComponentModule,
    InvoicePageRoutingModule,
    ButtonComponentModule,
    FormsModule,
    RouterModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [InvoicePageComponent]
})
export class InvoicePageComponentModule { }
