import { Component, OnDestroy, ViewChildren, ElementRef, Renderer2, QueryList, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Service, Services, services } from '@kk/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kk-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit, OnDestroy {
  public service: Service;

  private _params$: Subscription;

  @ViewChild('ViewContainer', { static: true, read: ViewContainerRef })
  private _viewContainer: ViewContainerRef;

  @ViewChild('Template', { static: true, read: TemplateRef })
  private _template: TemplateRef<any>;

  constructor(private renderer: Renderer2, private route: ActivatedRoute) {
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
