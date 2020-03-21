import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { GetQuoteTemplateComponent } from './modal-templates/get-quote-template/get-quote-template.component';
import { InvoiceTemplateComponent } from './modal-templates/invoice/invoice-template.component';
import { CommonModule } from '@angular/common';
import { ContactFormComponentModule } from '../contact-form/contact-form.component.module';
import { TextComponentModule } from '../text/text.component.module';
import { ButtonComponentModule } from '../button/button.component.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ModalComponent,
    GetQuoteTemplateComponent,
    InvoiceTemplateComponent
  ],
  imports: [
    CommonModule,
    ContactFormComponentModule,
    TextComponentModule,
    ButtonComponentModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    FontAwesomeModule
  ],
  exports: [
    ModalComponent,
    GetQuoteTemplateComponent,
    InvoiceTemplateComponent
  ]
})
export class ModalComponentModule { }
