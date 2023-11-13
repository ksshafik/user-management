import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { of } from 'rxjs';
import { UserLoginResponse } from 'src/app/shared/interfaces/user-login-response';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let _loginResponse: UserLoginResponse = {
    message: 'success',
    userName: 'ksshafik@gmail.com',
    password: '12345',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
      declarations: [LoginComponent],
      providers: [AuthenticationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading User Login', () => {
    const app = fixture.componentInstance;
    expect(app.heading).toEqual('User Login');
  });

  it('should onSubmit with login success', inject(
    [Router],
    (mockRouter: Router) => {
      const authenticationServiveStub: AuthenticationService =
        fixture.debugElement.injector.get(AuthenticationService);
      spyOn(authenticationServiveStub, 'login').and.returnValue(
        of(_loginResponse)
      );

      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.onSubmit();
      expect(_loginResponse.message).toContain('success');
      expect(spy.calls.first().args[0]).toContain('/home');
    }
  ));

  it('should onSubmit with login failure', () => {
    let _loginResponseFailure: UserLoginResponse = {
      message: 'failure',
      userName: 'ksshafik',
      password: '123',
    };
    const authenticationServiveStub: AuthenticationService =
      fixture.debugElement.injector.get(AuthenticationService);
    spyOn(authenticationServiveStub, 'login').and.returnValue(
      of(_loginResponseFailure)
    );
    component.onSubmit();
    expect(_loginResponseFailure.message).toContain('failure');
  });
});
