import { Component, Input, OnInit } from '@angular/core';

enum ButtonSizes {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg'
}

enum ButtonTypes {
  PRIMARY = 'primary',
  ACCENT = 'accent',
  WARNING = 'warning',
  DANGER = 'danger'
}

@Component({
  selector: 'kk-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  public text: string;

  @Input()
  public size: ButtonSizes;

  @Input()
  public link: string;

  @Input()
  public type: ButtonTypes;

  @Input()
  public isFullWidth = false;

  public classList: string;

  ngOnInit() {
    this.setClassList();
  }

  private setClassList() {
    const size = this.size || ButtonSizes.MEDIUM;
    const type = this.type || ButtonTypes.PRIMARY;
    this.classList = `kk-btn-${size} kk-btn-${type}${this.isFullWidth ? ' kk-btn-full-width' : ''}`;
  }
}
