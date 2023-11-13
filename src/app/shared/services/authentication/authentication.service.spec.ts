import { TestBed } from '@angular/core/testing';
import { UserLoginResponse } from '../../interfaces/user-login-response';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be create AuthenticationService', () => {
    expect(service).toBeTruthy();
  });
  it('should login with success', () => {
    let _loginResponse: UserLoginResponse = {
      message: 'success',
      userName: 'ksshafik@gmail.com',
      password: '12345',
    };
    service.login(_loginResponse.userName, _loginResponse.password);
    expect(_loginResponse.message).toContain('success');
  });

  it('should login with failure', () => {
    let _loginResponse: UserLoginResponse = {
      message: 'failure',
      userName: '',
      password: '',
    };
    service.login(_loginResponse.userName, _loginResponse.password);
    expect(_loginResponse.message).toContain('failure');
  });
});
