import { NgModule } from '@angular/core';
import { TextComponent } from './text/text.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ParallaxImageDirective } from './directives/parallax-image/parallax-image.directive';
import { ImageComponent } from './image/image.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LightboxComponent } from './lightbox/lightbox.component';

const apiKey = 'AIzaSyCiOpWBea90oaarpYelbTYeI_-0ajplfQw';
const clientId = '671573167109-mgtqvm775p8o36tft3tmd2uitbhdm772.apps.googleusercontent.com';
const clientSecret = 'gNKa3TVxmlfXliPsg0uT8nrf';

const components = [
  TextComponent,
  ButtonComponent,
  TestimonialsComponent,
  ServiceCardComponent,
  ServiceListComponent,
  ParallaxImageDirective,
  ImageComponent,
  LoadingSpinnerComponent,
  LightboxComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: components,
  entryComponents: [ImageComponent]
})
export class ComponentsModule { }
