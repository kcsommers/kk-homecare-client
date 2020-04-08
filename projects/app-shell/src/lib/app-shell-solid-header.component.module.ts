import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppShellSolidHeaderComponent } from './app-shell-solid-header.component';
import { FooterComponentModule } from './footer/footer.component.module';
import { ModalComponentModule } from '@kk/components';
import { HeaderSolidComponentModule } from './header/header-solid/header-solid.component.module';

@NgModule({
  declarations: [AppShellSolidHeaderComponent],
  imports: [
    RouterModule,
    HeaderSolidComponentModule,
    FooterComponentModule,
    ModalComponentModule
  ],
  exports: [AppShellSolidHeaderComponent]
})
export class AppShellSolidHeaderComponentModule { }
