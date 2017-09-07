import 'zone.js/dist/zone';
import 'reflect-metadata';

import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserAppModule } from './app/browser-app.module';

if (environment.production) {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic()
    .bootstrapModule(BrowserAppModule)
    .then((appRef: any) => {
      enableDebugTools(appRef);
    });
}

document.addEventListener('DOMContentLoaded', main, false);
