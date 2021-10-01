import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeadMaster } from '../model/head-master';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class HeadMasterService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'headmaster';
  constructor(private http: HttpClient) { }
  addHeadmaster(headmaster: HeadMaster): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, headmaster);
  }
  getHeadMaster(email: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${email}`);
  }
  updateHeadMaster(id: number, headMaster: HeadMaster): Observable<Response> {
    return this.http.put(`${this.baseUrl}/${id}`, headMaster);
  }
  deleteHeadMaster(id: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
