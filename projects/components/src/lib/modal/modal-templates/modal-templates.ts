import { GetQuoteTemplateComponent } from './get-quote-template/get-quote-template.component';
import { InvoiceTemplateComponent } from './invoice/invoice-template.component';
import { Type } from '@angular/core';
import { ModalTemplates } from '@kk/core';

export const modalTemplateMap = new Map<ModalTemplates, Type<any>>([
  [ModalTemplates.QUOTE, GetQuoteTemplateComponent],
  [ModalTemplates.INVOICE, InvoiceTemplateComponent]
]);
