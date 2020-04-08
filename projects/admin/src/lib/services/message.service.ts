import { Injectable } from '@angular/core';
import { MessageModel, MessageResponse } from '../admin-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@kk/core';

@Injectable()
export class MessageService {
  constructor(private _http: HttpClient) {
  }

  public getMessage(id: string): Observable<MessageResponse> {
    return this._http.get<MessageResponse>(`${environment.apiUrl}/admin/messages/${id}`);
  }

  public getMessages(): Observable<MessageResponse> {
    return this._http.get<MessageResponse>(`${environment.apiUrl}/admin/messages`);
  }

  public deleteMessage(id: string): Observable<HttpResponse> {
    return this._http.delete<HttpResponse>(`${environment.apiUrl}/admin/messages/${id}`);
  }

  public markAsSeen(id: string): Observable<HttpResponse> {
    return this._http.put<HttpResponse>(`${environment.apiUrl}/admin/messages/${id}`, { seen: true });
  }
}
