import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AppShellRoutingModule } from '../lib/app-shell-routing.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

const components = [
  HeaderComponent,
  LandingPageComponent,
  FooterComponent,
  AboutPageComponent,
  ServicesPageComponent
];

@NgModule({
  declarations: components,
  imports: [
    ComponentsModule,
    AppShellRoutingModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: components
})
export class AppShellModule { }
