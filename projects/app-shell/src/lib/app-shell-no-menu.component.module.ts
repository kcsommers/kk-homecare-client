import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppShellNoMenuComponent } from './app-shell-no-menu.component';

@NgModule({
  declarations: [AppShellNoMenuComponent],
  imports: [
    RouterModule,
  ],
  exports: [AppShellNoMenuComponent]
})
export class AppShellNoMenuComponentModule { }
