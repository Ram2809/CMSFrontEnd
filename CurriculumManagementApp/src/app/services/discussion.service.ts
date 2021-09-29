import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discussion } from '../model/discussion';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'discussion';
  constructor(private http: HttpClient) { }
  addDiscussion(discussion: Discussion): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, discussion);
  }
  getDiscussions(unitNo: string, roomNo: number, staffId: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${unitNo}/${roomNo}/${staffId}`);
  }
  getDiscussion(questionNo: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '?questionNo=' + `${questionNo}`);
  }
  updateDiscussion(questionNo: number, discussion: Discussion): Observable<Response> {
    return this.http.put(`${this.baseUrl}` + '/' + `${questionNo}`, discussion);
  }
  deleteDiscussion(questionNo: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}` + '/' + `${questionNo}`);
  }
  getDiscussionByRoomNo(unitNo:string,roomNo:number):Observable<Response>
  {
    return this.http.get(`${this.baseUrl}/${unitNo}/${roomNo}`);
  }
}
