import { NgModule } from '@angular/core';
import { ComponentsModule, TextComponentModule, ModalComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppShellRootComponent } from './app-shell-root';
import { RouterModule } from '@angular/router';
import { FooterComponentModule } from './footer/footer.component.module';
import { HeaderComponentModule } from './header/header.component.module';
import { AppShellComponentModule } from './app-shell.component.module';
import { AppShellNoMenuComponentModule } from './app-shell-no-menu.component.module';
import { AppShellSolidHeaderComponentModule } from './app-shell-solid-header.component.module';

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
    AppShellNoMenuComponentModule,
    AppShellSolidHeaderComponentModule
  ],
  exports: [AppShellRootComponent]
})
export class AppShellModule { }
