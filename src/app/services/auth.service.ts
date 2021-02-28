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
export class AuthService {
  // public authServiceUrl = environment.auth_service;
  public authServiceUrl = environment.Services.auth_service;
  apiVersion = '/api/v1';
  login = '/login';
  refresh = '/refresh';
  logout = '/logout';
  list = '/account/list';
  new = '/account/new';
  update = '/account/update';
  remove = '/account/remove';
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  _login(user: string, pass: string): Observable<string> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.login;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      username: user,
      password: pass
    };
    return this.http.post<string>(authUrl, body, { headers });
  }

  _logout(): Observable<string> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.logout;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = '';
    return this.http.post<string>(authUrl, body, { headers });
  }

  listAccounts(): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.list;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = '';
    return this.http.post<any>(authUrl, body, { headers });
  }

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

  updateAccount(newUser: UserModel): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.update;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      displayname: newUser.displayname,
      role: newUser.role,
      password: newUser.password
    };
    return this.http.post(authUrl, body, { headers });
  }

  removeAccount(newUser: UserModel): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.remove;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      displayname: newUser.displayname,
      role: newUser.role,
      password: newUser.password
    };
    return this.http.post(authUrl, body, { headers });
  }

  getJWTToken(): string | null {
    return localStorage.getItem('token');
  }

  _getRefreshToken(): Observable<string> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.refresh;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = '';
    return this.http.post<string>(authUrl, body, { headers });
  }


  isLoggedIn(): boolean {
    let userState = false;
    if (this.cookieService.check('is-logged-in')) {
      userState = true;
    } else {
      this.router.navigate(['login'], {});
    }
    return userState;
  }

  _uiLogout(): void {
    this.cookieService.delete('is-loggin-in');
    this.cookieService.delete('ts-cookie');
    localStorage.clear();
    this.router.navigate(['login'], {});
  }
}
