import { Injectable } from '@angular/core';

@Injectable()
export class TokenExchangerService {
  private token: string;

  public get(): string {
    return this.token;
  }

  public set(s: string): void {
    this.token = s;
  }
}
