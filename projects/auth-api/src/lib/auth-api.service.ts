import { inject, Injectable } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthApi.endPoints';
import { AuthApiAdaptorService } from './adaptor/authApi.adaptor';
import { LoginData } from './interfaces/loginData';
import { LoginRes } from './interfaces/loginRes';
import { RegisterData } from './interfaces/registerData';
import { forgetPasswordData } from './interfaces/forgetPasswordData';
import { Code } from './interfaces/verifyCodeData';
import { SetPassword } from './interfaces/setPasswordData';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApi {
  private _http = inject(HttpClient);
  private _authAdaptor = inject(AuthApiAdaptorService);

  login(data: LoginData): Observable<LoginRes> {
    return this._http.post(AuthEndPoint.SIGNIN, data).pipe(
      map((res: any) => this._authAdaptor.adapt(res)),
      catchError((err) =>
        throwError(() => new Error('Incorrect email or password!!'))
      )
    );
  }

  register(data: RegisterData): Observable<LoginRes> {
    return this._http.post(AuthEndPoint.SIGNUP, data).pipe(
      map((res: any) => this._authAdaptor.adapt(res)),
      catchError((err) =>
        throwError(() => new Error('Email or user name already exists!!'))
      )
    );
  }

  forgetPassword(data: forgetPasswordData): Observable<any> {
    return this._http
      .post(AuthEndPoint.FORGET_PASSWORD, data)
      .pipe(
        catchError((err) => throwError(() => new Error('Email is not exist!!')))
      );
  }

  verifyCode(data: Code): Observable<any> {
    return this._http
      .post(AuthEndPoint.VERIFY_CODE, data)
      .pipe(catchError((err) => throwError(() => new Error('Invalid code!!'))));
  }

  resetPassword(data: SetPassword): Observable<any> {
    return this._http
      .put(AuthEndPoint.RESET_PASSWORD, data)
      .pipe(
        catchError((err) =>
          throwError(() => new Error('Incorrect email or password!!'))
        )
      );
  }
}
