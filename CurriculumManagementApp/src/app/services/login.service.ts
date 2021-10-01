import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { Login } from '../model/login';
import { UrlUtil } from '../model/url-util';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'login';
  constructor(private http: HttpClient) { }
  addLogin(login: Login): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, login);
  }
  getLogin(staffId: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${staffId}`);
  }
  updateLogin(staffId: number, login: Login): Observable<Response> {
    return this.http.put(`${this.baseUrl}/${staffId}`, login);
  }
}
