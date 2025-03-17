import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { LoginApiData, LoginRes } from '../interfaces/loginRes';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptorService implements Adaptor {
  adapt(data: LoginApiData): LoginRes {
    return {
      message: data.message,
      token: data.token,
      email: data.user.email,
    };
  }
}
