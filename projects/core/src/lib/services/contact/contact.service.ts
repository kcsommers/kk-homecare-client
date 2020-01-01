import { Injectable } from '@angular/core';
import { JobTypes } from '../../data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  jobType: JobTypes;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  public submitForm(data: FormSubmission): Observable<any> {
    return this.http.post('', data);
  }
}
