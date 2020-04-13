import { Component, OnDestroy, ViewChild, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service, services } from '@kk/core';
import { Subscription } from 'rxjs';
import { BasePage } from '../base-page';

@Component({
  selector: 'kk-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent extends BasePage implements OnInit, OnDestroy {
  public service: Service;

  private _params$: Subscription;

  @ViewChild('ViewContainer', { static: true, read: ViewContainerRef })
  private _viewContainer: ViewContainerRef;

  @ViewChild('Template', { static: true, read: TemplateRef })
  private _template: TemplateRef<any>;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this._params$ = this.route.params.subscribe(params => {
      const service = services.find(s => s.name === params.id);
      if (service) {
        this._viewContainer.clear();
        this.service = service;
        this.attachView();
      }
    });
  }

  ngOnDestroy() {
    this._params$.unsubscribe();
  }

  private attachView() {
    this._viewContainer.createEmbeddedView(this._template, { service: this.service });
  }
}
