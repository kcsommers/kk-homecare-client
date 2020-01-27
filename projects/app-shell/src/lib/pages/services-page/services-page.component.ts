import { Component } from '@angular/core';
import { Service, services, Services } from '@kk/core';

@Component({
  selector: 'kk-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent {
  public services = services;
}
