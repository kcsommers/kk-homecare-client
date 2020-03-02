import { Component, Input, OnDestroy, Type, ViewChild, ViewContainerRef, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';
import { ModalService } from 'projects/core/src/lib/services/modal.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalTemplates } from '@kk/core';

@Component({
  selector: 'kk-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {

  private _destroy$ = new Subject();

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
        (componentType: Type<any>) => {
          if (this._container) {
            if (componentType) {
              this.open(componentType);
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
    this._renderer.addClass(this._el.nativeElement, 'modal-open');
  }

  private close(): void {
    this._renderer.removeClass(this._el.nativeElement, 'modal-open');
    this._container.clear();
  }
}

