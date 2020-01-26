import { Component, Input } from '@angular/core';
import { Service, capitalize } from '@kk/core';

@Component({
  selector: 'kk-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input()
  public service: Service;

  public capitalize = capitalize;

}

