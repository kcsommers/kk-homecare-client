import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { InvoiceItem, InvoiceModel, InvoiceResponse } from '../../admin-data';
import { MomentInput } from 'moment';
import { InvoiceService } from '../../services/invoice.service';
import { HttpResponse } from '@kk/core';
const moment = require('moment');

class Invoice {

  public clientName = '';

  public clientEmail = '';

  public clientPhone: string;

  public items: InvoiceItem[] = [];

  public dueDate: MomentInput = moment().add(7, 'days');

  public total = '$0.00';

  public constructor(invoiceModel?: InvoiceModel) {
    if (invoiceModel) {
      this.clientName = invoiceModel.client.name;
      this.clientEmail = invoiceModel.client.email;
      this.clientPhone = String(invoiceModel.client.phone);
      this.items = invoiceModel.items;
      this.dueDate = invoiceModel.dueDate || moment().add(7, 'days');
    }
  }

  public calculateTotal(): void {
    this.total = this.getTotal();
  }

  public getTotal(): string {
    const total = this.items.reduce((total: number, currItem: InvoiceItem) => {
      total += currItem.totalNum;
      return total;
    }, 0);
    return `$${total / 100}`;
  }

  public create(): InvoiceModel {
    return {
      client: {
        name: this.clientName,
        email: this.clientEmail,
        phone: +this.clientPhone.replace(/[()-]/g, '')
      },
      items: this.items,
      datePaid: null,
      dateSent: null,
      dueDate: this.dueDate,
      total: this.total,
      sent: false,
      paid: false
    };
  }
}

@Component({
  selector: 'kk-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss'],
  providers: [InvoiceService]
})
export class InvoicePageComponent implements OnInit, OnDestroy {

  private _destroy = new Subject();

  public newItemName = '';

  public newItemDescription = '';

  public newItemTotal = '';

  public invoice: Invoice;

  private _prevTotal = '';

  public isNewInvoice = true;

  public errors = {
    clientName$: new BehaviorSubject(''),
    noItems$: new BehaviorSubject('')
  }

  public get newItemValid(): boolean {
    return !!(
      this.newItemName &&
      this.newItemTotal
    );
  }

  @ViewChild('NewItemTotalInput', { static: false, read: ElementRef })
  private _newItemTotalInput: ElementRef<HTMLInputElement>;

  constructor(
    private _route: ActivatedRoute,
    private _invoiceService: InvoiceService,
    private _router: Router
  ) {
    this._route.params
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        this.setInvoice(params.id)
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }

  private setInvoice(id: string) {
    if (id && id !== '0') {
      this._invoiceService.getInvoice(id)
        .pipe(take(1))
        .subscribe(
          (res: InvoiceResponse) => {
            if (res.data && res.data.invoices && res.data.invoices[0]) {
              this.isNewInvoice = false;
              this.invoice = new Invoice(res.data.invoices[0]);
              console.log('DUE DATE:::: ', this.invoice.dueDate)
            } else {
              this._router.navigateByUrl('admin/invoice/0', { relativeTo: this._route });
            }
          },
          err => {
            this._router.navigateByUrl('admin/invoice/0', { relativeTo: this._route });
            console.error(err);
          }
        );
    } else {
      this.invoice = new Invoice();
    }
  }

  public save() {
    if (this.newItemValid) {
      this.addItem();
    }
    if (this.validateInvoice()) {
      this._invoiceService.createInvoice(this.invoice.create())
        .pipe(take(1))
        .subscribe(
          (res: InvoiceResponse) => {
            console.log('Res:::: ', res)
          },
          err => console.error(err)
        );
    }
  }

  public addItem() {
    if (this.invoice) {
      this.invoice.items.push({
        name: this.newItemName,
        description: this.newItemDescription,
        totalString: this.newItemTotal,
        totalNum: this.parseTotal(this.newItemTotal),
        itemId: Math.floor(Math.random() * 100000)
      });
      this.invoice.calculateTotal();
      this.clearNewItem();
      this.clearErrors();
    }
  }

  private clearNewItem() {
    this.newItemName = '';
    this.newItemDescription = '';
    this.newItemTotal = '';
  }

  private clearErrors() {
    this.errors.clientName$.next('');
    this.errors.noItems$.next('');
  }

  private parseTotal(amount: string): number {
    const noDecValue = +amount.replace('.', '');
    if (noDecValue < 100) {
      return noDecValue;
    }
    const numGroups = `${noDecValue}`.match(/^([0-9]*)([0-9]{2})$/);
    return (+numGroups[1] * 100) + +numGroups[2];
  }

  public validateTotal(value: string) {
    const noDecValue = +value.replace('.', ''); // gets rid of leading 0s
    if (isNaN(noDecValue)) {
      this.newItemTotal = this._newItemTotalInput.nativeElement.value = this._prevTotal;
    } else {
      if (noDecValue === 0) {
        this.newItemTotal = this._prevTotal = '';
        return;
      }
      if (noDecValue < 10) {
        this.newItemTotal = this._prevTotal = `0.0${noDecValue}`;
        return;
      }
      if (noDecValue < 100) {
        this.newItemTotal = this._prevTotal = `0.${noDecValue}`;
        return;
      }
      if (noDecValue >= 100) {
        const numGroups = `${noDecValue}`.match(/^([0-9]*)([0-9]{2})$/);
        this.newItemTotal = this._prevTotal = `${numGroups[1]}.${numGroups[2]}`;
      }
    }
  }

  private validateInvoice(): boolean {
    let valid = true;
    if (!this.invoice.clientName) {
      this.errors.clientName$.next('*Client name required');
      valid = false;
    }
    if (!this.invoice.items.length) {
      this.errors.noItems$.next('*Must create at least one item');
      valid = false;
    }
    return valid;
  }
}
