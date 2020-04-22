import { Component, Input, HostBinding, OnInit } from '@angular/core';

enum Fonts {
  PRIMARY = 'primary',
  HEADER = 'header'
}

enum FontStyles {
  NORMAL = 'normal',
  ITALIC = 'italic',
  UNDERLINE = 'underline'
}

@Component({
  selector: 'kk-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input()
  public isHeader = false;

  @Input()
  public content: string[] | string;

  @Input()
  public size: string;

  @Input()
  public font: Fonts;

  @Input()
  public fontStyle: FontStyles;

  @Input()
  public fontWeight: string;

  @Input()
  public color: string;

  @Input()
  public link: string;

  @Input()
  public textAlign: string;

  public classList: string;

  private colors = ['primary', 'accent', 'offwhite', 'peach', 'danger'];

  @HostBinding('style.color')
  public get colorBinding(): string {
    return (this.color && !this.colors.includes(this.color)) ? this.color : '';
  }

  @HostBinding('class.inherit-color')
  public get inheritColor(): boolean {
    return !this.color && !this.colors.includes(this.color);
  }

  @HostBinding('style.fontSize')
  public get fontSizeBinding(): string {
    return this.size || '';
  }

  @HostBinding('class.inherit-font-size')
  public get inheritSize(): boolean {
    return !!(this.size);
  }

  @HostBinding('class.kk-text-link')
  public get hasLink(): boolean {
    return !!(this.link);
  }

  @HostBinding('style.fontWeight')
  public get fontWeightBinding(): string {
    return this.fontWeight || '';
  }

  @HostBinding('style.textAlign')
  public get textAlignBinding(): string {
    return this.textAlign || '';
  }

  ngOnInit(): void {
    const font = this.font || Fonts.PRIMARY;
    const style = this.fontStyle || FontStyles.NORMAL;
    const color = this.color && this.colors.includes(this.color) ? ` kk-color-${this.color}` : '';
    this.classList = `kk-text-${font} kk-text-${style}${color}`;
  }

  public typeof(content: string | string[]) {
    return typeof content;
  }
}
