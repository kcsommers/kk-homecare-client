import { Component, HostListener } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'kk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public hasWhiteBg = false;

  @HostListener('window:scroll')
  private onScroll(): void {
    this.hasWhiteBg = window.scrollY > 50;
  }

  constructor(public headerService: HeaderService) {
  }
}
