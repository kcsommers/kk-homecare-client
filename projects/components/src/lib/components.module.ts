import { NgModule } from '@angular/core';
import { TextComponentModule } from './text/text.component.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParallaxImageDirective } from './directives/parallax-image/parallax-image.directive';
import { ToggleComponentModule } from './toggle/toggle.component.module';
import { TestimonialsComponentModule } from './testimonials/testimonials.component.module';
import { ServiceListComponentModule } from './service-list/service-list.component.module';
import { ServiceCardComponentModule } from './service-card/service-card.component.module';
import { ModalComponentModule } from './modal/modal.component.module';
import { LoadingSpinnerComponentModule } from './loading-spinner/loading-spinner.component.module';
import { LightboxComponentModule } from './lightbox/lightbox.component.module';
import { ImageComponentModule } from './image/image.component.module';
import { ContactFormComponentModule } from './contact-form/contact-form.component.module';
import { ButtonComponentModule } from './button/button.component.module';

const apiKey = 'AIzaSyCiOpWBea90oaarpYelbTYeI_-0ajplfQw';
const clientId = '671573167109-mgtqvm775p8o36tft3tmd2uitbhdm772.apps.googleusercontent.com';
const clientSecret = 'gNKa3TVxmlfXliPsg0uT8nrf';

@NgModule({
  declarations: [ParallaxImageDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    ToggleComponentModule,
    TextComponentModule,
    TestimonialsComponentModule,
    ServiceListComponentModule,
    ServiceCardComponentModule,
    ModalComponentModule,
    LoadingSpinnerComponentModule,
    LightboxComponentModule,
    ImageComponentModule,
    ContactFormComponentModule,
    ButtonComponentModule
  ],
  exports: [ParallaxImageDirective]
})
export class ComponentsModule { }
