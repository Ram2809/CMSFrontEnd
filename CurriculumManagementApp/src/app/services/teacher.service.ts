import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../model/teacher';
import { Response } from '../model/response';
import { HttpClient } from '@angular/common/http';
import { UrlUtil } from '../model/url-util';
import { TeacherAssign } from '../model/teacher-assign';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'teacher';
  constructor(private http: HttpClient) { }
  addStaff(teacher: Teacher): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, teacher);
  }
  getStaffs(): Observable<Response> {
    return this.http.get(`${this.baseUrl}`);
  }
  assignStaff(teacherAssign: TeacherAssign): Observable<Response> {
    return this.http.post(`${this.urlUtil.baseUrl}` + 'teacherassign', teacherAssign);
  }
  getTeacherId(assignId: number): Observable<Response> {
    return this.http.get(`${this.urlUtil.baseUrl}` + 'teacherassign/' + `${assignId}`);
  }
  getStaff(staffId: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/' + `${staffId}`);
  }
  getSubjectAssignIds(staffId: number): Observable<Response> {
    return this.http.get(`${this.urlUtil.baseUrl}` + 'teacherassign?staffId=' + `${staffId}`);
  }
}
