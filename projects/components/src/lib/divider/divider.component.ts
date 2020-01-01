import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kk-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent {
  @Input()
  public colors: string[];

  @HostBinding('style.backgroundColor')
  public get backgroundColor() {
    return this.colors && this.colors[1] ? this.colors[1] : '#FAFAFA';
  }
}
