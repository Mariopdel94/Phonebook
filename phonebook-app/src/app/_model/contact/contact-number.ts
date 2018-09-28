export class ContactNumber {
  public type = '';
  public number = ''; // This is string because phone numbers often ends on 0 and because an integer would be too big

  constructor() {}

  public static parse(obj: any): ContactNumber {
    return new ContactNumber().set(obj);
  }

  public set(obj: any): this {
    this.type = String(obj.type || this.type || '');
    this.number = String(obj.number || this.number || '');
    return this;
  }

  public clone(): ContactNumber {
    return new ContactNumber().set(this);
  }

  public clear(): this {
    Object.keys(this).forEach((key) => {
      this[key] = null;
    });
    this.set({});
    return this;
  }
}
