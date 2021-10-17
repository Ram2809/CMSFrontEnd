import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Major } from '../model/major';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class MajorService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'major';
  constructor(private http: HttpClient) { }
  addMajor(major: Major): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, major);
  }
  getAllMajors(): Observable<Response> {
    return this.http.get(`${this.baseUrl}`);
  }
  deleteMajor(id: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
