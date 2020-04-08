import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {
  constructor(private _http: HttpClient) {
  }
}
