import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Class } from '../model/class';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { UrlUtil } from '../model/url-util';
@Injectable({
  providedIn: 'root'
})
export class ClassService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'class';
  constructor(private http: HttpClient) { }
  addClass(classDetail: Class): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, classDetail);
  }
  getAllClasses(): Observable<Response> {
    return this.http.get(`${this.baseUrl}`)
  }
  updateClass(roomNo: number, classDetail: Class): Observable<Response> {
    return this.http.put(`${this.baseUrl}` + '/' + `${roomNo}`, classDetail)
  }
  getClass(roomNo: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/' + `${roomNo}`)
  }
  deleteClass(roomNo: Number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}` + '/' + `${roomNo}`)
  }
  getClassesByStandard(standard: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/standard/' + `${standard}`)
  }
  getClassRoomNo(standard: string, section: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/' + `${standard}` + '/' + `${section}`)
  }
  getClassList(roomNoList: Number[]): Observable<Response> {
    return this.http.get(`${this.baseUrl}/list/${roomNoList}`);
  }
}
