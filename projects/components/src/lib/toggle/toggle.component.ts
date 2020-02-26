import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kk-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  @Input()
  public isToggled = false;

  @Output()
  public isToggledChange = new EventEmitter<boolean>();

  constructor() {
  }

  public toggle() {
    this.isToggled = !this.isToggled;
    this.isToggledChange.emit(this.isToggled);
  }
}
