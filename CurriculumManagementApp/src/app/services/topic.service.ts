import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
import { Topic } from '../model/topic';
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
  getTopics(unitNo: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${unitNo}`);
  }
}
