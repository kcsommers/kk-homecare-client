import { Component, Input, HostBinding } from '@angular/core';
import { services } from '@kk/core';

@Component({
  selector: 'kk-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {
  @Input()
  public showHeader = true;
}

