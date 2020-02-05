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

const components = [
  TextComponent,
  ButtonComponent,
  TestimonialsComponent,
  ServiceCardComponent,
  ServiceListComponent,
  ParallaxImageDirective,
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: components
})
export class ComponentsModule { }
