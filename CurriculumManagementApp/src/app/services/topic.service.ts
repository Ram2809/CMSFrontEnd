import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
import { Topic } from '../model/topic';
import { HttpClient } from '@angular/common/http';
import { TeacherSignupComponent } from '../components/teacher/profile/teacher-signup/teacher-signup.component';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'topic';
  constructor(private http: HttpClient) { }
  addTopic(topic: Topic): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, topic);
  }
  getTopics(subjectCode: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/subject/' + `${subjectCode}`);
  }
  deleteTopic(unitNo: string): Observable<Response> {
    return this.http.delete(`${this.baseUrl}` + '/' + `${unitNo}`);
  }
  updateTopic(unitNo: string, topic: Topic): Observable<Response> {
    return this.http.put(`${this.baseUrl}` + '/' + `${unitNo}`, topic);
  }
  getTopic(unitNo: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '?unitNo=' + `${unitNo}`)
  }
  getSubjectByUnit(unitNo: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/' + `${unitNo}`);
  }
}
