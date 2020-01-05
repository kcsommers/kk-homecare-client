import { Component, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'kk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private isScrolled = false;

  @HostBinding('style.height')
  private get height(): string {
    return this.isScrolled ? '65px' : '125px';
  }

  public get logoWidth(): string {
    return this.isScrolled ? '40px' : '70px';
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(e: Event) {
    if (this.isScrolled && window.scrollY < 100) {
      this.isScrolled = false;
    }
    if (!this.isScrolled && window.scrollY > 100) {
      this.isScrolled = true;
    }
  }
}
