import { GetQuoteTemplateComponent } from './get-quote-template/get-quote-template.component';
import { Type } from '@angular/core';
import { ModalTemplates } from '@kk/core';
import { ImageUploadTemplateComponent } from './image-upload-template/image-upload-template.component';

export const modalTemplateMap = new Map<ModalTemplates, Type<any>>([
  [ModalTemplates.QUOTE, GetQuoteTemplateComponent],
  [ModalTemplates.IMAGE_UPLOAD, ImageUploadTemplateComponent]
]);
