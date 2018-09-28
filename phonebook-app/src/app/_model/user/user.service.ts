import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { apiUrl } from './../../globals';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { SessionService } from '../../_services/session.service';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  public login(account: string, password: string): Observable<{user: User }> {
    const params = {
      email: String(account || ''),
      password: String(password || ''),
    };
    return this.http.post(apiUrl + 'user/in', params)
    .map((data: any) => {
      if (data.session_token) {
        const token = data.session_token;
        this.sessionService.storeToken(token);
      }
      let user = new User();
      if (data.user) {
        user = User.parse(data.user);
        this.sessionService.storeUser(user);
      }
      return { user: user };
    }, error => {
      console.log('Error: ', error);
    });
  }

  public logout(): Observable<boolean> {
    return this.http.get(apiUrl + 'user/out')
    .map(() => {
      return true;
    }, error => {
      console.log('Error: ', error);
      return false;
    });
  }

  public getAll(currentPage: number,
    perPage: number,
    search: string,
    paginate: boolean,
    privilege: string ): Observable<{ list: User[], totalItems: number }> {
    const params = [
      `page=${ currentPage }`,
      `per_page=${ perPage }`,
      `search=${ search }`,
      `paginate=${ Number(paginate || 0)}`,
    ].join('&');

    let queryUrl = 'user/all';
    if (privilege !== 'all') {
      queryUrl += '/' + privilege;
    }
    return this.http.get(`${ apiUrl }${ queryUrl }?` + params)
      .map((data: any) => {
        return {
          list: (data.results.data || data.results || []).map((user) => User.parse(user)),
          totalItems: Number(data.results.total || 0),
        };
      });
  }

  public saveUser(user: User): Observable<{ user: User }> {
    const params = {
      id: user.id,
      email: user.email,
      password: user.password,
      full_name: user.fullName,
      phone_number: user.phoneNumber,
      privilege: user.privilege,
      address: user.address,
      pin: user.pin,
    };
    return this.http.post(`${ apiUrl }user/${ user.id }`, params)
    .map((data: any) => {
      let savedUser = new User();
      if (data.user) {
        savedUser = User.parse(data.user);
      }
      return { user: savedUser };
    }, error => {
      console.log('Error: ', error);
    });
  }

  public removeUser(user: User) {
    const params = {
      id: user.id
    };

    return this.http.delete(`${ apiUrl }user/${params.id}`);
  }

  public getUser(search: string): Observable<User[]> {
    const params = [
      `page=1`,
      `per_page=20`,
      `search=${ search }`,
      `paginate=0`,
    ].join('&');

    return this.http.get(`${ apiUrl }user/all?` + params)
    .map((data: any) => {
      return (data.results.data || data.results || []).map((user) => User.parse(user));
    });
  }

}
