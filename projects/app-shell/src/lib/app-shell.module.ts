import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AppShellRoutingModule } from '../lib/app-shell-routing.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [HeaderComponent, LandingPageComponent, FooterComponent, AboutPageComponent],
  imports: [
    ComponentsModule,
    AppShellRoutingModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [LandingPageComponent, AboutPageComponent, HeaderComponent, FooterComponent]
})
export class AppShellModule { }
