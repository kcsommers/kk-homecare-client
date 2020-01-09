import { Component, Input, OnInit } from '@angular/core';
import { Service } from '@kk/core';
import { Services } from 'projects/core/src/lib/data';

@Component({
  selector: 'kk-service-viewer',
  templateUrl: './service-viewer.component.html',
  styleUrls: ['./service-viewer.component.scss']
})
export class ServiceViewerComponent implements OnInit {
  @Input()
  public services: Service[];

  public currentService: Service;

  ngOnInit() {
    this.currentService = this.services[0];
  }

  public getDisplayName(name: Services): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
