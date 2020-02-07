import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private http: HttpClient) { }

  public getImages(folder: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/photos/${folder}`);
  }
}
