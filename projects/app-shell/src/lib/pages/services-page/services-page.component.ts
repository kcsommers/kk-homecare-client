import { Component } from '@angular/core';
import { Service, services } from '@kk/core';
import { Services } from 'projects/core/src/lib/data';

@Component({
  selector: 'kk-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent {
  public services = services;
}
