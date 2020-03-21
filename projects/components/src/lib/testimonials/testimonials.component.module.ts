import { NgModule } from '@angular/core';
import { TestimonialsComponent } from './testimonials.component';
import { TextComponentModule } from '../text/text.component.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TestimonialsComponent],
  imports: [
    CommonModule,
    TextComponentModule,
    FontAwesomeModule
  ],
  exports: [TestimonialsComponent]
})
export class TestimonialsComponentModule { }
