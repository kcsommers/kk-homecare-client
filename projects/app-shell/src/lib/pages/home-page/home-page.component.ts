import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { services, ModalTemplates } from '@kk/core';
import { ModalService } from 'projects/core/src/lib/services/modal.service';
import { BasePage } from '../base-page';

@Component({
  selector: 'kk-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BasePage implements OnDestroy {
  private _destroy$ = new Subject();
  public animate = true;
  public services = services;

  constructor(private _modalService: ModalService) {
    super();
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.unsubscribe();
  }

  public openGetQuoteModal(): void {
    this._modalService.openModal(ModalTemplates.QUOTE);
  }
}
