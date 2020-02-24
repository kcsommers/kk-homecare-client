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

  public getImages(
    filters: Filters[],
    limit: number,
    offsets: { [filter: string]: number }
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/photos`, { filters, limit, offsets });
  }
}
