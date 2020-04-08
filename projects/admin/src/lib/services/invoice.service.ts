import { Injectable } from '@angular/core';
import { InvoiceModel, InvoiceResponse } from '../admin-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class InvoiceService {
  constructor(private _http: HttpClient) {
  }

  public getInvoice(id: string): Observable<InvoiceResponse> {
    return this._http.get<InvoiceResponse>(`${environment.apiUrl}/admin/invoices/${id}`);
  }

  public getInvoices(
    lastId: string,
    searchTerm: string,
    filter: string,
  ): Observable<InvoiceResponse> {
    let url = `${environment.apiUrl}/admin/invoices?lastId=${lastId}`;
    if (searchTerm) {
      url += `&q=${searchTerm}`;
    }
    if (filter) {
      url += `&filter=${filter}`;
    }
    return this._http.get<InvoiceResponse>(url);
  }

  public createInvoice(invoice: InvoiceModel): Observable<InvoiceResponse> {
    return this._http.post<InvoiceResponse>(`${environment.apiUrl}/admin/invoices/create`, { invoice });
  }
}
