import { Injectable } from '@angular/core';
import { InvoiceModel } from './admin-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  constructor(private _http: HttpClient) {
  }

  public getOverdueInvoices(offset: number): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${environment.apiUrl}/admin/invoices/overdue?offset=${offset}`);
  }

  public getUnpaidInvoices(offset: number): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${environment.apiUrl}/admin/invoices?offset=${offset}`);
  }

  public searchInvoices(searchTerm: string): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${environment.apiUrl}/admin/invoices/search?q=${searchTerm}`);
  }

  public getRecentlyPaidInvoices(): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${environment.apiUrl}/admin/invoices`);
  }

  public createInvoice(invoice: InvoiceModel): Observable<InvoiceModel[]> {
    return this._http.post<InvoiceModel[]>(`${environment.apiUrl}/admin/invoices`, { invoice });
  }

  public deleteInvoice(invoice: InvoiceModel): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${environment.apiUrl}/admin/invoices`);
  }
}
