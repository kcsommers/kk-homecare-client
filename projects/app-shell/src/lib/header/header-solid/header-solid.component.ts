import { Component } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'kk-header-solid',
  templateUrl: './header-solid.component.html',
  styleUrls: ['./header-solid.component.scss']
})
export class HeaderSolidComponent {
  constructor(public headerService: HeaderService) {
  }
}
