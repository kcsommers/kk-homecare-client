import { Component, Input } from '@angular/core';

@Component({
  selector: 'kk-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input()
  public content: string;

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
  public lineHeight: string;

  @Input()
  public link: string;
}
