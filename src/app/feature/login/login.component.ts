import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';
import { UserLoginResponse } from 'src/app/shared/interfaces/user-login-response';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'um-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;
  public heading: string;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.heading = Constants.labels.login;
    this.form = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    this._authenticationService
      .login(
        this.form.controls['userName'].value,
        this.form.controls['password'].value
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: UserLoginResponse) => {
        console.log('result: ', result);
        if (result.message === 'success') {
          this._router.navigate(['/home']);
          this._openSnackBar(
            Constants.messages.loginSuccess + result.userName,
            'Close',
            { duration: Constants.duration.snackBarTimeoutSuccess }
          );
        } else {
          this._openSnackBar(Constants.messages.loginFailure, 'Close', {
            duration: Constants.duration.snackBarTimeoutFailure,
          });
        }
      });
  }

  private _openSnackBar(
    message: string,
    action: string,
    config?: MatSnackBarConfig
  ): void {
    this._snackBar.open(message, action, config);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
