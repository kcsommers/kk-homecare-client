import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, AuthorizedAdmin, LoginResult } from '../data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentAdmin$ = new BehaviorSubject<AuthorizedAdmin>(null);

  public static ADMIN_KEY = '__kk__admin__'

  constructor(private _http: HttpClient) {
    const admin = localStorage.getItem(AuthenticationService.ADMIN_KEY);
    if (admin) {
      this.currentAdmin$.next(JSON.parse(admin));
    }
  }

  public login(req: LoginRequest): Observable<LoginResult> {
    return this._http.post<LoginResult>(`${environment.apiUrl}/admin/login`, req);
  }

  public logout(): Observable<boolean> {
    return this._http.post<boolean>(`${environment.apiUrl}/admin/logout`, null);
  }

  public setAdmin(admin: AuthorizedAdmin) {
    this.currentAdmin$.next(admin);
    localStorage.setItem(AuthenticationService.ADMIN_KEY, JSON.stringify(admin));
  }

  public getAdmin(): AuthorizedAdmin {
    return this.currentAdmin$.value;
  }

  public removeAdmin(): void {
    localStorage.removeItem(AuthenticationService.ADMIN_KEY);
    this.currentAdmin$.next(null);
  }
}
