import { UserModel } from './../user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public authServiceUrl = environment.auth_service;
  apiVersion = '/api/v1';
  login = '/login';
  refresh = '/refresh';
  logout = '/logout';
  list = '/account/list';
  set = '/account/set';
  toggle = '/account/toggle';
  new = '/account/new';
  update = '/account/update';
  remove = '/account/remove';
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  newAccount(newUser: UserModel): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.new;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      username: newUser.username,
      email: newUser.email,
      displayname: newUser.displayname,
      role: newUser.role,
      password: newUser.password
    };
    return this.http.post(authUrl, body, { headers });
  }

  setPassword(acct: UserModel): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.set;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      id: acct.id,
      username: acct.username,
      email: acct.email,
      displayname: acct.displayname,
      role: acct.role,
      isenabled: acct.isenabled,
      password: acct.password,

    };
    return this.http.post(authUrl, body, { headers });
  }

  toggleAccount(acct: UserModel): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.toggle;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      id: acct.id,
      username: '',
      email: '',
      displayname: '',
      role: '',
      isenabled: acct.isenabled,
      password: ''

    };
    return this.http.post(authUrl, body, { headers });
  }

}
