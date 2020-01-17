import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kk-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input()
  public content: string[];

  @Input()
  public size: string;

  @Input()
  public font: string;

  @Input()
  public fontStyle: string;

  @Input()
  public fontWeight: string;

  @Input()
  public color: string;

  @Input()
  public link: string;

  @HostBinding('style.color')
  private get colorBinding(): string {
    return this.color || '';
  }

  @HostBinding('class.inherit-color')
  private get inheritColor(): boolean {
    return !!(this.color);
  }

  @HostBinding('style.fontSize')
  private get fontSizeBinding(): string {
    return this.size || '';
  }

  @HostBinding('class.inherit-font-size')
  private get inheritSize(): boolean {
    return !!(this.size);
  }

  @HostBinding('class.kk-text-link')
  private get hasLink(): boolean {
    return !!(this.link);
  }

  @HostBinding('style.fontWeight')
  private get fontWeightBinding(): string {
    return this.fontWeight || '';
  }

}
