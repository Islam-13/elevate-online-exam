import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;
  private _platformID = inject(PLATFORM_ID);

  constructor() {
    this.isBrowser = isPlatformBrowser(this._platformID);
  }

  set(key: string, value: string) {
    if (!this.isBrowser) return;

    localStorage.setItem(key, value);
  }

  get(key: string) {
    if (!this.isBrowser) return;

    return localStorage.getItem(key);
  }

  remove(key: string) {
    if (!this.isBrowser) return;

    localStorage.removeItem(key);
  }

  clear() {
    if (!this.isBrowser) return;

    localStorage.clear();
  }
}
