import { Component } from '@angular/core';
import { services } from '@kk/core';
import { BasePage } from '../base-page';

@Component({
  selector: 'kk-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent extends BasePage {
  public services = services;
}
