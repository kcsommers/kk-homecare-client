import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule, TextComponentModule, ModalComponentModule } from 'projects/components/src/public-api';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { AppShellComponent } from './app-shell.component';
import { AppShellRootComponent } from './app-shell-root';
import { RouterModule } from '@angular/router';
import { AppShellNoMenuComponent } from './app-shell-no-menu.component';
import { FooterComponentModule } from './footer/footer.component.module';
import { HeaderComponentModule } from './header/header.component.module';
import { AppShellComponentModule } from './app-shell.component.module';
import { AppShellNoMenuComponentModule } from './app-shell-no-menu.component.module';

@NgModule({
  declarations: [AppShellRootComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    TextComponentModule,
    ModalComponentModule,
    FooterComponentModule,
    HeaderComponentModule,
    AppShellComponentModule,
    AppShellNoMenuComponentModule
  ],
  exports: [AppShellRootComponent]
})
export class AppShellModule { }
