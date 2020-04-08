import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { GetQuoteTemplateComponent } from './modal-templates/get-quote-template/get-quote-template.component';
import { CommonModule } from '@angular/common';
import { ContactFormComponentModule } from '../contact-form/contact-form.component.module';
import { TextComponentModule } from '../text/text.component.module';
import { ButtonComponentModule } from '../button/button.component.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageUploadTemplateComponent } from './modal-templates/image-upload-template/image-upload-template.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ModalComponent,
    GetQuoteTemplateComponent,
    ImageUploadTemplateComponent
  ],
  imports: [
    CommonModule,
    ContactFormComponentModule,
    TextComponentModule,
    ButtonComponentModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    FontAwesomeModule,
    MatSelectModule
  ],
  exports: [
    ModalComponent,
    GetQuoteTemplateComponent
  ],
  entryComponents: [GetQuoteTemplateComponent, ImageUploadTemplateComponent]
})
export class ModalComponentModule { }
