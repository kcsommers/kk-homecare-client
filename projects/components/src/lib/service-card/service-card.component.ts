import { Component, Input } from '@angular/core';
import { Service, capitalize, Services } from '@kk/core';

@Component({
  selector: 'kk-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input()
  public service: Service;

  public serviceUrlMap = new Map<Services, string>([
    [
      Services.PAINTING,
      'painting'
    ],
    [
      Services.CLEANING,
      'cleaning'
    ],
    [
      Services.WALLPAPERING,
      'wallpapering'
    ],
    [
      Services.LANDSCAPING,
      'landscaping'
    ]
  ]);

  public capitalize = capitalize;

}

