import { Component, Input, ViewChild, ViewContainerRef, ViewChildren, TemplateRef, QueryList, AfterViewInit, Renderer2, EmbeddedViewRef, OnInit } from '@angular/core';
import { Testimonial, testimonials } from '@kk/core';

@Component({
  selector: 'kk-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  @ViewChild('ViewContainer', { static: true, read: ViewContainerRef })
  private _viewContainer: ViewContainerRef;

  @ViewChild('Template', { static: true, read: TemplateRef })
  private _template: TemplateRef<any>;

  public testimonials = testimonials;

  public currentIndex = -1;

  private _currentView: EmbeddedViewRef<any>;

  private _animating = false;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.next(true);
  }

  public next(initial = false): void {
    this.currentIndex = this.currentIndex === testimonials.length - 1 ? 0 : this.currentIndex + 1;
    this.slide('slide-out-right', initial ? '' : 'slide-in-right');
  }

  public prev(): void {
    this.currentIndex = this.currentIndex === 0 ? testimonials.length - 1 : this.currentIndex - 1;
    this.slide('slide-out-left', 'slide-in-left');
  }

  private slide(slideOut: string, slideIn: string) {
    if (!this._animating) {
      this._animating = true;
      let insertIndex = 0;
      if (this._currentView) {
        insertIndex = 1;
        this.renderer.addClass(this._currentView.rootNodes[0], slideOut);
        this.removeView();
      } else {
        setTimeout(() => {
          this._animating = false;
        }, 1000);
      }
      this._currentView = this._viewContainer.createEmbeddedView(
        this._template,
        { t: testimonials[this.currentIndex] },
        insertIndex
      );
      if (slideIn) {
        this.renderer.addClass(this._currentView.rootNodes[0], slideIn);
      }
    }
  }

  private removeView() {
    setTimeout(() => {
      this._viewContainer.remove(0);
      this._animating = false;
    }, 1000);
  }
}
