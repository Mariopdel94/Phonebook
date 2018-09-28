import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../_model/user/user';

@Injectable()
  export class SessionService {
  private token: string;
  private id: string;
  public user: User;

  public onChange: EventEmitter<boolean> = new EventEmitter();

  public privileges = {};

  constructor() {
    this.token = localStorage.getItem('sessionToken') || undefined,
      this.id = localStorage.getItem('sessionId') || undefined,
      this.privileges = localStorage.getItem('privileges') || undefined,
      this.user = this.loadUser();
  }

  public hasPrivilegeTo(action: string): boolean {
    const user = this.getUser();
    if (this.privileges[action]) {
      if (this.privileges[action][0] === '*') {
        return true;
      }
      // return (this.privileges[action].indexOf(user.role) >= 0);
    } else {
      console.warn('At privilege list, action:', action, 'has not been defined');
      return false;
    }
  }

  public loadUser(): User {
    const storage = localStorage.getItem('userInSession');
    if (storage) {
      const storedUser = JSON.parse(atob(storage));
      this.user = Object.assign(new User(), storedUser);
      return this.user;
    }
  }

  public loadPrivileges(): any {
    const privileges = localStorage.getItem('privileges');
    if (privileges) {
      const storedPrivileges = JSON.parse(atob(privileges));
      return storedPrivileges;
    } else {
      localStorage.clear();
      location.reload();
    }
  }

  public storePrivileges(privileges: any) {
    this.privileges = privileges;
    const stringBase64 = btoa(JSON.stringify(this.privileges));
    localStorage.setItem('privileges', stringBase64);
    this.onChange.emit();
  }

  public storeUser(user: User): void {
    this.user = user;
    const stringBase64 = btoa(JSON.stringify(this.user));
    localStorage.setItem('userInSession', stringBase64);
    this.onChange.emit();
  }

  public storeToken(sessionToken: any): void {
    this.token = String(sessionToken);
    localStorage.setItem('sessionToken', this.token);
    this.onChange.emit();
  }

  public clear(): void {
    localStorage.clear();
    this.user = undefined;
    this.token = undefined;
    this.id = undefined;
  }

  public getUser(): User {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }

  public getId(): string {
    return this.id;
  }

  public isLogged(): boolean {
    return Boolean(this.token);
  }
}
