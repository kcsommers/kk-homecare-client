import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Service, Services, services } from '@kk/core';

@Component({
  selector: 'kk-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent {
  public service: Service;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const service = services.find(s => s.name === params.id);
      if (service) {
        this.service = service;
      }
    })
  }
}
