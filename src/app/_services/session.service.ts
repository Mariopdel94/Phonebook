import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../_model/user/user';

@Injectable()
  export class SessionService {
  public user: User;

  public privileges = {};

  constructor() {
    this.user = this.loadUser();
  }

  public loadUser(): User {
    const storage = localStorage.getItem('userInSession');
    if (storage) {
      const storedUser = JSON.parse(atob(storage));
      this.user = Object.assign(new User(), storedUser);
      return this.user;
    }
  }

  public storeUser(user: User): void {
    this.user = user;
    const stringBase64 = btoa(JSON.stringify(this.user));
    localStorage.setItem('userInSession', stringBase64);
  }

  public clear(): void {
    localStorage.clear();
    this.user = undefined;
  }

  public getUser(): User {
    return this.user;
  }

  public isLogged(): boolean {
    // return true;
    return Boolean(this.user && this.user.id > 0);
  }
}
