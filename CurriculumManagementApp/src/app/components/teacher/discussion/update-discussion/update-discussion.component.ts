import { Component, OnInit } from '@angular/core';
import { Discussion } from 'src/app/model/discussion';
import { DiscussionService } from 'src/app/services/discussion.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-update-discussion',
  templateUrl: './update-discussion.component.html',
  styleUrls: ['./update-discussion.component.css']
})
export class UpdateDiscussionComponent implements OnInit {
  public discussion: Discussion = new Discussion();
  public questionNo: number = 0;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    let getItem: string = "";
    getItem = String(localStorage.getItem('questionNo'));
    this.questionNo = parseInt(getItem);
    this.discussionService.getDiscussion(this.questionNo).subscribe(response => {
      let responseBody: Response = response;
      this.discussion = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  updateDiscussion() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.discussionService.updateDiscussion(this.questionNo, this.discussion).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
}
