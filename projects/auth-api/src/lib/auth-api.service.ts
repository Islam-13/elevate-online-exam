import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { AuthApi } from './base/AuthApi';
import { LoginRes } from './interfaces/loginRes';
import { BASE_URL } from '../public-api';
import { LoginData } from './interfaces/loginData';
import { AuthEndPoint } from './enums/AuthApi.endPoints';
import { RegisterData } from './interfaces/registerData';
import { Code, CodeRes } from './interfaces/verifyCodeData';
import { AuthApiAdaptorService } from './adaptor/authApi.adaptor';
import { SetPassword, SetPasswordRes } from './interfaces/setPasswordData';
import {
  ForgetPasswordData,
  ForgetPasswordRes,
} from './interfaces/forgetPasswordData';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApi {
  private readonly _http = inject(HttpClient);
  private readonly _authAdaptor = inject(AuthApiAdaptorService);
  private readonly _baseURL = inject(BASE_URL);

  login(data: LoginData): Observable<LoginRes> {
    return this._http.post(`${this._baseURL}${AuthEndPoint.SIGNIN}`, data).pipe(
      map((res: any) => this._authAdaptor.adapt(res)),
      catchError((err) =>
        throwError(() => new Error('Incorrect email or password!!'))
      )
    );
  }

  register(data: RegisterData): Observable<LoginRes> {
    return this._http.post(`${this._baseURL}${AuthEndPoint.SIGNUP}`, data).pipe(
      map((res: any) => this._authAdaptor.adapt(res)),
      catchError((err) =>
        throwError(() => new Error('Email or user name already exists!!'))
      )
    );
  }

  forgetPassword(data: ForgetPasswordData): Observable<ForgetPasswordRes> {
    return this._http
      .post(`${this._baseURL}${AuthEndPoint.FORGET_PASSWORD}`, data)
      .pipe(
        map((res: any) => res),
        catchError((err) => throwError(() => new Error('Email is not exist!!')))
      );
  }

  verifyCode(data: Code): Observable<CodeRes> {
    return this._http
      .post(`${this._baseURL}${AuthEndPoint.VERIFY_CODE}`, data)
      .pipe(
        map((res: any) => res),
        catchError((err) => throwError(() => new Error('Invalid code!!')))
      );
  }

  resetPassword(data: SetPassword): Observable<SetPasswordRes> {
    return this._http
      .put(`${this._baseURL}${AuthEndPoint.RESET_PASSWORD}`, data)
      .pipe(
        map((res: any) => res),
        catchError((err) =>
          throwError(() => new Error('Incorrect email or password!!'))
        )
      );
  }
}
