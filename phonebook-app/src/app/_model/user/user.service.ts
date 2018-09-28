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

  public saveUser(user: User): Observable<{ user: User }> {
    const params = {
      id: Number(user.id || 0),
      password: String(user.password || ''),
      username: String(user.username || ''),
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

  public getUser(userId: number): Observable<{ record: User }> {
    return this.http.get(`${ apiUrl }user/` + userId)
    .map((data: any) => {
      return { record: User.parse(data.user) };
    });
  }

}
