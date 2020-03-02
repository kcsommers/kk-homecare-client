import { Injectable, Type } from '@angular/core';
import { ModalTemplates } from '../data';
import { BehaviorSubject } from 'rxjs';
import { GetQuoteTemplateComponent } from 'projects/components/src/lib/modal/modal-templates/get-quote-template/get-quote-template.component';

const templateMap = new Map<ModalTemplates, Type<any>>([
  [ModalTemplates.QUOTE, GetQuoteTemplateComponent]
]);

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public openModal$ = new BehaviorSubject<Type<any>>(null);

  constructor() { }

  public openModal(template: ModalTemplates): void {
    if (templateMap.get(template)) {
      this.openModal$.next(templateMap.get(template));
    }
  }

  public closeModal(): void {
    this.openModal$.next(null);
  }
}
