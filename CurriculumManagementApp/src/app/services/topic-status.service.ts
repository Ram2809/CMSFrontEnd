import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicStatus } from '../model/topic-status';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class TopicStatusService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'topicstatus';
  constructor(private http: HttpClient) { }
  addTopicStatus(topicStatus: TopicStatus): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, topicStatus);
  }
  getTopicStatusByUnitNo(unitNo: string, staffId: number, roomNo: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${unitNo}/${staffId}/${roomNo}`);
  }
  deleteTopicStatus(statusId: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/${statusId}`);
  }
  updateTopicStatus(statusId: number, topicStatus: TopicStatus): Observable<Response> {
    return this.http.put(`${this.baseUrl}/${statusId}`, topicStatus);
  }
}
