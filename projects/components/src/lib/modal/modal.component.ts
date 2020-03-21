import { Component, OnDestroy, Type, ViewChild, ViewContainerRef, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';
import { ModalService } from 'projects/core/src/lib/services/modal.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, fromEvent, Subscription, BehaviorSubject } from 'rxjs';
import { ModalTemplates } from '@kk/core';
import { modalTemplateMap } from './modal-templates/modal-templates';

@Component({
  selector: 'kk-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {

  private _destroy$ = new Subject();

  private _click$: Subscription;

  public isOpen$ = new BehaviorSubject(false);

  @ViewChild('Container', { read: ViewContainerRef, static: false })
  private _container: ViewContainerRef;

  constructor(
    private _modalService: ModalService,
    private _cfr: ComponentFactoryResolver,
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {
    this._modalService.openModal$
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (template: ModalTemplates) => {
          if (this._container) {
            const templateType = modalTemplateMap.get(template);
            if (templateType) {
              this.open(templateType);
            } else {
              this.close();
            }
          }

        }
      );
  }

  ngOnDestroy() {
    this._destroy$.next(false);
    this._destroy$.complete();
  }

  private open(componentType: Type<any>): void {
    const factory = this._cfr.resolveComponentFactory(componentType);
    const compRef = this._container.createComponent(factory);
    compRef.instance.closeModal = this._modalService.closeModal.bind(this._modalService);

    this._renderer.addClass(this._el.nativeElement, 'modal-open');
    this.isOpen$.next(true);
    if (this._modalService.closeOnClick) {
      this._click$ = fromEvent(document, 'click').subscribe((e: MouseEvent) => {
        e.preventDefault();
        if (e.target['classList'].contains('modal-open') || e.target['classList'].contains('modal-content-wrap')) {
          this.close();
        }
      });
    }
  }

  private close(): void {
    this.isOpen$.next(false);
    if (this._click$) {
      this._click$.unsubscribe();
    }
    this._renderer.removeClass(this._el.nativeElement, 'modal-open');
    this._container.clear();
  }
}

