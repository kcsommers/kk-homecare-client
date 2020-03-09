import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest, AuthorizedAdmin } from '../data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentAdmin$ = new BehaviorSubject<AuthorizedAdmin>(null);

  public login(req: LoginRequest): void {

  }

  public logout(): void {

  }
}
