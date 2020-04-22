import { Component, OnDestroy, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit, HostListener } from '@angular/core';
import { LightboxService } from 'projects/core/src/lib/services/lightbox.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'kk-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements AfterViewInit, OnDestroy {
  private _destroy$ = new Subject();

  @ViewChild('LightboxContainer', { static: false, read: ViewContainerRef })
  private _lightboxContainer: ViewContainerRef;

  @ViewChild('LightboxTemplate', { static: false, read: TemplateRef })
  private _lightboxTemplate: TemplateRef<any>;

  @HostListener('click', ['$event'])
  public onClick(e: MouseEvent) {
    this.lightboxService.close();
  }

  constructor(public lightboxService: LightboxService) {
  }

  ngAfterViewInit() {
    this.lightboxService.open$
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        isOpen => {
          if (isOpen) {
            this._lightboxContainer.createEmbeddedView(this._lightboxTemplate);
          } else {
            this._lightboxContainer.remove();
          }
        }
      );
  }

  ngOnDestroy() {
    this._destroy$.next(false);
    this._destroy$.complete();
  }
}

