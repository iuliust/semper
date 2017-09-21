import { OpaqueToken, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalStorageService {
  public isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      console.log('i am a browser');
    }
  }

  getItem(key: string): string {
    if (!this.isBrowser) { return }
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    if (!this.isBrowser) { return }
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    if (!this.isBrowser) { return }
    localStorage.removeItem(key);
  }

}
