import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthorizedAdmin } from '../data';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentAdmin = this._authService.getAdmin();
    const redirect = (): boolean => {
      this._router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } })
      return false;
    }
    if (currentAdmin) {
      if (!currentAdmin.expiresAt || Date.now() > currentAdmin.expiresAt) {
        this._authService.removeAdmin();
        return redirect();
      }
      return true;
    }
    return redirect();
  }
}
