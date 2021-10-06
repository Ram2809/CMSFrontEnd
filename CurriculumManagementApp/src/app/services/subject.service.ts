import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
import { Observable } from 'rxjs';
import { Subject } from '../model/subject';
import { SubjectAssign } from '../model/subject-assign';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'subject';
  constructor(private http: HttpClient) { }
  addSubject(subject: Subject): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, subject);
  }
  assignSubject(subjectAssign: SubjectAssign): Observable<Response> {
    return this.http.post(`${this.urlUtil.baseUrl}` + 'subjectassign', subjectAssign);
  }
  getSubjets(roomNo: number): Observable<Response> {
    return this.http.get(`${this.urlUtil.baseUrl}` + 'subjectassign/' + `${roomNo}`);
  }
  deleteSubject(code: string): Observable<Response> {
    return this.http.delete(`${this.baseUrl}` + '/' + `${code}`)
  }
  updateSubject(code: string, subject: Subject): Observable<Response> {
    return this.http.put(`${this.baseUrl}` + '/' + `${code}`, subject);
  }
  getSubject(code: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/' + `${code}`);
  }
  getAssignId(roomNo: number, subjectCode: string): Observable<Response> {
    return this.http.get(`${this.urlUtil.baseUrl}` + 'subjectassign/' + `${roomNo}` + '/' + `${subjectCode}`);
  }
  getSubjectCode(assignId: number, roomNo: number): Observable<Response> {
    return this.http.get(`${this.urlUtil.baseUrl}` + 'subjectassign/subject/' + `${assignId}` + '/' + `${roomNo}`);
  }
  getRoomNo(assignId: number): Observable<Response> {
    return this.http.get(`${this.urlUtil.baseUrl}` + 'subjectassign/subject/' + `${assignId}`);
  }
  deleteSubjectAssign(roomNo: number): Observable<Response> {
    return this.http.delete(`${this.urlUtil.baseUrl}subjectassign/${roomNo}`);
  }
  getRoomNoList(assignList:Number[]):Observable<Response>{
    return this.http.get(`${this.urlUtil.baseUrl}subjectassign/list/${assignList}`);
  }
}
