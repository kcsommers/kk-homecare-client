import { NgModule } from '@angular/core';
import { ContactFormComponent } from './contact-form.component';
import { CommonModule } from '@angular/common';
import { TextComponentModule } from '../text/text.component.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ButtonComponentModule } from '../button/button.component.module';

@NgModule({
  declarations: [ContactFormComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ButtonComponentModule,
    TextComponentModule
  ],
  exports: [ContactFormComponent]
})
export class ContactFormComponentModule { }
