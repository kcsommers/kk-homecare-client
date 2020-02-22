import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Filters } from '../data';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private http: HttpClient) { }

  public getImages(filters: Filters[], limit: number, offset: number, includeTotal: boolean): Observable<any> {
    return this.http.post(`${environment.apiUrl}/photos`, { filters, limit, offset, includeTotal });
  }
}
