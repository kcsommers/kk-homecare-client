import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalTemplates } from '@kk/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public openModal$ = new BehaviorSubject<ModalTemplates>(null);

  public closeOnClick = true;

  constructor() { }

  public openModal(template: ModalTemplates, closeOnClick = true): void {
    this.closeOnClick = closeOnClick;
    this.openModal$.next(template);
  }

  public closeModal(): void {
    this.openModal$.next(null);
  }
}
