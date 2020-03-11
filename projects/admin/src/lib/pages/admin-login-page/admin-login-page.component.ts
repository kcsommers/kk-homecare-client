import { Component } from '@angular/core';
import { AuthenticationService, AuthorizedAdmin, LoginResult } from '@kk/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kk-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss']
})
export class AdminLoginPageComponent {
  public usernameInput: string;
  public passwordInput: string;

  public get formValid(): boolean {
    return !!(
      this.usernameInput &&
      this.passwordInput
    );
  }

  constructor(
    private _authService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  public login(): void {
    if (this.formValid) {
      this._authService.login({
        username: this.usernameInput,
        password: this.passwordInput
      })
        .pipe(take(1))
        .subscribe(
          (result: LoginResult) => {
            console.log('RES', result);
            if (result.error) {
              console.error(result.error);
            }
            if (result.success && result.data) {
              this._authService.setAdmin(result.data.admin);
              const returnUrl = this._route.snapshot.queryParams['returnUrl'];
              this._router.navigateByUrl(returnUrl || '/admin');
            }
          },
          err => console.error(err)
        );
    }
  }
}
