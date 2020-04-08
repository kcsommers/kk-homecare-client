import { Component } from '@angular/core';
import { AuthenticationService } from '@kk/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kk-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  public username: string;
  constructor(private _authService: AuthenticationService, private _router: Router) {
    const admin = this._authService.getAdmin();
    if (admin) {
      this.username = admin.username;
    } else {
      this._router.navigate(['/admin/login'], { queryParams: { returnUrl: '/admin' } });
    }

  }
  public logout(): void {
    this._authService.logout();
  }
  public navigateToDashboard(): void {
    this._router.navigateByUrl('admin');
  }
}
