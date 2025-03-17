import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  loggedToken = signal('');

  saveUser() {
    if (localStorage.getItem('loggedToken')) {
      this.loggedToken = jwtDecode(localStorage.getItem('loggedToken')!);
    }
  }
}
