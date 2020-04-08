import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { take, takeUntil, debounceTime, filter, switchMap } from 'rxjs/operators';
import { InvoiceResponse, InvoiceModel } from '../../admin-data';
import { fromEvent, Subscription, Subject } from 'rxjs';
const moment = require('moment');

@Component({
  selector: 'kk-invoices-dashboard',
  templateUrl: './invoices-dashboard.component.html',
  styleUrls: ['./invoices-dashboard.component.scss'],
  providers: [InvoiceService]
})
export class InvoicesDashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  private _lastInvoiceId: string;

  public invoices: InvoiceModel[] = [];

  public gotTotal = false;

  public totalInvoices = 0;

  private _keyup$: Subscription;

  private _searchTerm = '';

  private _filter = 'none';

  private _destroy$ = new Subject();

  @ViewChild('SearchBar', { static: false, read: ElementRef })
  private _searchBar: ElementRef<HTMLInputElement>;

  filters = [
    { value: 'none', viewValue: 'None' },
    { value: 'past-due', viewValue: 'Past Due' },
    { value: 'paid', viewValue: 'Paid' },
    { value: 'not-sent', viewValue: 'Not Sent' }
  ];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _invoiceService: InvoiceService
  ) {
    this._router.events
      .pipe(
        filter(ev => ev instanceof NavigationEnd),
        switchMap((navEnd: NavigationEnd) => this._route.queryParams),
        takeUntil(this._destroy$)
      )
      .subscribe(
        queryParams => {
          if (queryParams) {
            if (queryParams.q) {
              this._searchTerm = queryParams.q;
            }
            if (queryParams.filter) {
              this._filter = queryParams.filter;
            }
          }
          this.loadInvoices();
        }
      )
  }

  ngOnInit(): void {
    // this.loadInvoices();
  }

  ngAfterViewInit(): void {
    this._keyup$ = fromEvent(this._searchBar.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe(this.searchInvoices.bind(this));
  }

  ngOnDestroy(): void {
    this._keyup$.unsubscribe();
    this._destroy$.next(false);
    this._destroy$.complete();
  }

  public filterChanged(filter: string): void {
    console.log('Filter chagne');
    this._lastInvoiceId = undefined;
    this._filter = filter;
    this.updateParams({ filter: this._filter });
    this.loadInvoices();
  }

  public searchInvoices(event: KeyboardEvent): void {
    this._lastInvoiceId = undefined;
    this._searchTerm = event.target['value'];
    this.updateParams({ q: this._searchTerm });
    this.loadInvoices();
  }

  private updateParams(params: Params) {
    this._router.navigate(
      [],
      {
        relativeTo: this._route,
        queryParams: params,
        queryParamsHandling: 'merge'
      }
    );
  }

  public loadInvoices(loadingMore = false): void {
    this._invoiceService.getInvoices(
      this._lastInvoiceId,
      this._searchTerm,
      this._filter
    )
      .pipe(take(1))
      .subscribe(
        (result: InvoiceResponse) => {
          if (result.success) {
            if (loadingMore) {
              this.invoices.push(...result.data.invoices);
            } else {
              console.log('WHy')
              this.invoices = result.data.invoices;
            }
            if (result.data.invoices.length) {
              this._lastInvoiceId = result.data.invoices[result.data.invoices.length - 1]._id;
            }
            this.totalInvoices = result.data.total;
          }
        },
        err => console.error(err)
      )
  }

  public newInvoice(): void {
    this._router.navigateByUrl('admin/invoice/0');
  }

  public editInvoice(id: string): void {
    this._router.navigateByUrl(`admin/invoice/${id}`);
  }

  public isPastDue(invoice: InvoiceModel): boolean {
    if (!invoice.paid && moment(Date.now()).isAfter(invoice.dueDate)) {
      return true;
    }
    return false;
  }
}
