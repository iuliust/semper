import { InjectionToken } from '@angular/core';

export * from './_models';
export * from './auth.service';
export * from './core.module';
export const LocalStorage = new InjectionToken('localStorage');
