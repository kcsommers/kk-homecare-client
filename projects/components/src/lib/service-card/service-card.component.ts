import { Component, Input, HostBinding } from '@angular/core';
import { Services } from '@kk/core';

@Component({
  selector: 'kk-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input()
  private service: Services;
}
