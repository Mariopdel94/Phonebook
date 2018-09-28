import * as moment from 'moment';

export class User {
  public id = 0;
  public username = '';
  public email = '';
  public password = '';
  public privilege = '';
  public lastAccess: Date;
  public fullName = '';
  public phoneNumber = '';
  public address = '';
  public isVisible = false;
  public pin = 0;

  constructor() {}

  public static parse(obj: any): User {
    return new User().set(obj);
  }

  public set(obj: any): this {
    this.id = Number(obj.id || this.id || 0);
    this.username = String(obj.username || this.username || '');
    this.email = String(obj.email || this.email || '');
    this.password = String(obj.password || this.password || '');
    this.privilege = String(obj.privilege || this.privilege || '');
    this.lastAccess = moment.utc(obj.lastAccess || this.lastAccess).local().toDate();
    this.fullName = String(obj.fullName || obj.full_name || this.fullName ||  '');
    this.phoneNumber = String(obj.phoneNumber || obj.phone_number || this.phoneNumber ||  '');
    this.address = String(obj.address || this.address || '');
    this.isVisible = Boolean(obj.isVisible || obj.is_visible || this.isVisible || 0);
    this.pin = Number(obj.pin || this.pin || 0);
    return this;
  }

  public clone(): User {
    return new User().set(this);
  }

  public clear(): this {
    Object.keys(this).forEach((key) => {
      this[key] = null;
    });
    this.set({});
    return this;
  }
}
