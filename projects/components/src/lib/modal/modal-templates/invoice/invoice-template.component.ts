import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { InvoiceItem } from 'projects/admin/src/lib/admin-data';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kk-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.scss']
})
export class InvoiceTemplateComponent {
  constructor() {
  }

  public closeModal: () => void

  public invoiceTotal = '$0.00';

  public dueDate = 'Monday January 3rd, 2021'

  public clientName = '';

  public items: InvoiceItem[] = [];

  public currentItemName = '';

  public currentItemDescription = '';

  public currentItemTotal = '';

  private _prevTotal = '';

  public errors = {
    clientName$: new BehaviorSubject(''),
    noItems$: new BehaviorSubject('')
  }

  public get formValid(): boolean {
    return !!(
      this.currentItemName &&
      this.currentItemTotal
    );
  }

  @ViewChild('CurrentItemTotalInput', { static: false, read: ElementRef })
  private _currentItemTotalInput: ElementRef<HTMLInputElement>;

  public addItem() {
    this.items.push({
      name: this.currentItemName,
      description: this.currentItemDescription,
      totalString: this.currentItemTotal,
      totalNum: this.parseTotal(this.currentItemTotal),
      id: Math.floor(Math.random() * 100000)
    });
    this.invoiceTotal = this.getTotal();
    this.clearInputs();
  }

  public removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }

  public createInvoice() {
    if (this.formValid) {
      this.addItem();
    }
    if (this.validateInvoice()) {
      this.closeModal();
    }
  }

  public cancel() {
    this.clearInputs();
    this.closeModal();
  }

  private clearInputs() {
    this.currentItemDescription = '';
    this.currentItemName = '';
    this.currentItemTotal = '';
  }

  public validateTotal(value: string) {
    const noDecValue = +value.replace('.', ''); // gets rid of leading 0s
    if (isNaN(noDecValue)) {
      this.currentItemTotal = this._currentItemTotalInput.nativeElement.value = this._prevTotal;
    } else {
      if (noDecValue === 0) {
        this.currentItemTotal = this._prevTotal = '';
        return;
      }
      if (noDecValue < 10) {
        this.currentItemTotal = this._prevTotal = `0.0${noDecValue}`;
        return;
      }
      if (noDecValue < 100) {
        this.currentItemTotal = this._prevTotal = `0.${noDecValue}`;
        return;
      }
      if (noDecValue >= 100) {
        const numGroups = `${noDecValue}`.match(/^([0-9]*)([0-9]{2})$/);
        this.currentItemTotal = this._prevTotal = `${numGroups[1]}.${numGroups[2]}`;
      }
    }
  }

  public getTotal(): string {
    const total = this.items.reduce((total: number, currItem: InvoiceItem) => {
      total += currItem.totalNum;
      return total;
    }, 0);
    return `$${total / 100}`;
  }

  private parseTotal(amount: string): number {
    const noDecValue = +amount.replace('.', '');
    if (noDecValue < 100) {
      return noDecValue;
    }
    const numGroups = `${noDecValue}`.match(/^([0-9]*)([0-9]{2})$/);
    return (+numGroups[1] * 100) + +numGroups[2];
  }

  private validateInvoice(): boolean {
    let valid = true;
    if (!this.clientName) {
      this.errors.clientName$.next('*Client name required');
      valid = false;
    }
    if (!this.items.length) {
      this.errors.noItems$.next('*Must provide at least one item')
    }
    console.log('VALID', valid)
    return valid;
  }
}
