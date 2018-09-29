export class User {
  public id = 0;
  public username = '';
  public password = '';

  constructor() {}

  public static parse(obj: any): User {
    return new User().set(obj);
  }

  public set(obj: any): this {
    this.id = Number(obj.id || this.id || 0);
    this.username = String(obj.username || this.username || '');
    this.password = String(obj.password || this.password || '');
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
