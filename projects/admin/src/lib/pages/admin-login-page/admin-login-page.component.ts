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

  public getErrorMessage(): string {
    return localStorage.getItem(AuthenticationService.LOGIN_ERROR_KEY);
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
            if (result.error) {
              this._authService.loginError('*Incorrect username or password');
              console.error(result.error);
            }
            if (result.success && result.data) {
              this._authService.setAdmin(result.data.admin);
              this._authService.clearLoginError();
              const returnUrl = this._route.snapshot.queryParams['returnUrl'];
              this._router.navigateByUrl(returnUrl || '/admin');
            }
          },
          err => {
            this._authService.loginError('Incorrect username or password');
            console.error(err)
          }
        );
    }
  }
}
