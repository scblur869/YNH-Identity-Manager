import { UserRole } from './../roles.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // public authServiceUrl = environment.auth_service;
  public authServiceUrl = environment.Services.auth_service;
  apiVersion = '/api/v1';
  getRoles = '/role/list';
  newRole = '/role/new';
  updateRole = 'role/update';
  removeRole = '/role/remove';
  constructor(private http: HttpClient) { }


  listRoles(): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.getRoles;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = '';
    return this.http.post<any>(authUrl, body, { headers });
  }

  addNewRole(newRole: UserRole): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.newRole;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      name: newRole.name,
      displayname: newRole.displayname,
      description: newRole.description
    };
    return this.http.post(authUrl, body, { headers });
  }

  updateExistingRole(role: UserRole): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.updateRole;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      id: role.id,
      username: role.name,
      displayname: role.displayname,
      description: role.description
    };
    return this.http.post(authUrl, body, { headers });
  }

  removeExistingRole(role: UserRole): Observable<any> {
    const authUrl = this.authServiceUrl + this.apiVersion + this.removeRole;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      id: role.id,
      username: role.name,
      displayname: role.displayname,
      description: role.description
    };
    return this.http.post(authUrl, body, { headers });
  }

}
