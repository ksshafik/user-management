import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Constants } from '../../constants/constants';
import { UserLoginResponse } from '../../interfaces/user-login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  public login(userName: string, password: string): Observable<UserLoginResponse> {
    let _loginResponse: UserLoginResponse = {
      message: 'success',
      userName,
      password,
    };
    if (
      userName === Constants.userCredentials.userName &&
      password === Constants.userCredentials.password
    ) {
      return of(_loginResponse);
    } else {
      _loginResponse.message = 'failure';
      return of(_loginResponse);
    }
  }
}
