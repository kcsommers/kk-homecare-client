import { Component } from '@angular/core';

@Component({
  selector: 'kk-app-shell',
  template: `
    <kk-header-solid></kk-header-solid>
    <router-outlet></router-outlet>
    <kk-footer></kk-footer>
    <kk-modal></kk-modal>
  `
})
export class AppShellSolidHeaderComponent {
}
