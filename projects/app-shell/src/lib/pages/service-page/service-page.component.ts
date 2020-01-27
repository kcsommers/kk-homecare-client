import { Component, OnDestroy, ViewChildren, ElementRef, Renderer2, QueryList } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Service, Services, services } from '@kk/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kk-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnDestroy {
  public service: Service;

  private _params$: Subscription;

  private _initial = true;

  @ViewChildren('FadeIn', { read: ElementRef })
  private _fadeInEls: QueryList<ElementRef<any>>;

  constructor(private renderer: Renderer2, private route: ActivatedRoute) {
    this._params$ = this.route.params.subscribe(params => {
      const service = services.find(s => s.name === params.id);
      if (service) {
        if (!this._initial) {
          this.removeFadeInClass();
        }
        this.service = service;
        if (!this._initial) {
          setTimeout(() => {
            this.addFadeInClass();

          })
        } else {
          this._initial = false;
        }
      }
    });
  }

  ngOnDestroy() {
    this._params$.unsubscribe();
  }

  removeFadeInClass() {
    this._fadeInEls.forEach(el => this.renderer.removeClass(el.nativeElement, 'fade-in'));
  }

  private addFadeInClass() {
    this._fadeInEls.forEach(el => this.renderer.addClass(el.nativeElement, 'fade-in'));
  }
}
