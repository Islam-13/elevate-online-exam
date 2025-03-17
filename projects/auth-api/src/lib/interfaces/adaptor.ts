import { LoginApiData, LoginRes } from './loginRes';

export interface Adaptor {
  adapt(data: LoginApiData): LoginRes;
}
