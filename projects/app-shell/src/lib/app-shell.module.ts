import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppShellRoutingModule } from '../lib/app-shell-routing.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';

const components = [
  HeaderComponent,
  HomePageComponent,
  FooterComponent,
  AboutPageComponent,
  ServicesPageComponent,
  ServicePageComponent
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
