import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { AppShellComponent } from './app-shell.component';
import { AppShellRootComponent } from './app-shell-root';
import { RouterModule } from '@angular/router';
import { AppShellNoMenuComponent } from './app-shell-no-menu.component';

const components = [
  HeaderComponent,
  FooterComponent,
  AppShellComponent,
  AppShellRootComponent,
  AppShellNoMenuComponent
];

@NgModule({
  declarations: components,
  imports: [
    ComponentsModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: components
})
export class AppShellModule { }
