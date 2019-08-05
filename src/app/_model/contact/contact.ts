import * as moment from 'moment';
import { ContactNumber } from './contact-number';

export class Contact {
  public id = 0;
  public phoneNumbers: ContactNumber[] = [];
  public firstName = '';
  public lastName = '';
  public nickName = '';
  public company = '';
  public website = '';
  public address = '';
  public comments = '';
  public email = '';
  public birthday: Date;
  public createdAt: Date;
  public updatedAt: Date;

  constructor() {}

  public static parse(obj: any): Contact {
    return new Contact().set(obj);
  }

  public set(obj: any): this {
    this.id = Number(obj.id || this.id || 0);
    this.phoneNumbers = (obj.phoneNumbers || obj.phonebooknumber || this.phoneNumbers) ? (obj.phoneNumbers || obj.phonebooknumber || this.phoneNumbers).map(phoneNumber => ContactNumber.parse(phoneNumber)) : [];
    this.firstName = String(obj.firstName || obj.first_name || this.firstName || '');
    this.lastName = String(obj.lastName || obj.last_name || this.lastName || '');
    this.nickName = String(obj.nickName || obj.nick_name || this.nickName || '');
    this.company = String(obj.company || this.company || '');
    this.website = String(obj.website || this.website || '');
    this.address = String(obj.address || this.address || '');
    this.comments = String(obj.comments || this.comments || '');
    this.email = String(obj.email || this.email || '');
    this.birthday = obj.birthday || this.birthday ? moment(obj.birthday || this.birthday).toDate() : undefined;
    this.createdAt = moment(obj.createdAt || this.createdAt).toDate();
    this.updatedAt = moment(obj.updatedAt || this.updatedAt).toDate();
    return this;
  }

  public clone(): Contact {
    return new Contact().set(this);
  }

  public clear(): this {
    Object.keys(this).forEach((key) => {
      this[key] = null;
    });
    this.set({});
    return this;
  }
}
