import { NgModule } from '@angular/core';
import { TextComponent } from './text/text.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceCardComponent } from './service-card/service-card.component';

const components = [
  TextComponent,
  ButtonComponent,
  ServiceCardComponent
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
