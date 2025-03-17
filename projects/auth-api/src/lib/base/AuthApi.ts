import { Observable } from 'rxjs';
import { LoginData } from '../interfaces/loginData';
import { RegisterData } from '../interfaces/registerData';
import { LoginRes } from '../interfaces/loginRes';

export abstract class AuthApi {
  abstract login(data: LoginData): Observable<LoginRes>;
  abstract register(data: RegisterData): Observable<any>;
}
