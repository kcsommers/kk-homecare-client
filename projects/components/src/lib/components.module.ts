import { NgModule } from '@angular/core';
import { TextComponent } from './text/text.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { IconComponent } from './icon/icon.component';
import { DividerComponent } from './divider/divider.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';
import { ServiceViewerComponent } from './service-viewer/service-viewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const components = [
  TextComponent,
  ButtonComponent,
  CardComponent,
  IconComponent,
  DividerComponent,
  ContactFormComponent,
  ServiceViewerComponent
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
