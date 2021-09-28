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
}
