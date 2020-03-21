import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell.component';
import { HeaderComponentModule } from './header/header.component.module';
import { ModalComponentModule } from '@kk/components';
import { FooterComponentModule } from './footer/footer.component.module';

@NgModule({
  declarations: [AppShellComponent],
  imports: [
    RouterModule,
    HeaderComponentModule,
    FooterComponentModule,
    ModalComponentModule,
  ],
  exports: [AppShellComponent]
})
export class AppShellComponentModule { }
