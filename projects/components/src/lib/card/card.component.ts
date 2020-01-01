import { Component, Input } from '@angular/core';

@Component({
  selector: 'kk-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input()
  public icon: string;
}
