import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentAdmin = this._authService.currentAdmin$.value;
    if (currentAdmin) {
      // already logged in, return true
      return true;
    }

    this._router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }
}
