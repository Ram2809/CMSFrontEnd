import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TopicStatus } from 'src/app/model/topic-status';
import { TopicStatusService } from 'src/app/services/topic-status.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-update-topic-status',
  templateUrl: './update-topic-status.component.html',
  styleUrls: ['./update-topic-status.component.css']
})
export class UpdateTopicStatusComponent implements OnInit {
  public topicStatus: TopicStatus = new TopicStatus();
  constructor(public dialogRef: MatDialogRef<UpdateTopicStatusComponent>,
    private topicStatusService: TopicStatusService) { }

  ngOnInit(): void {
    let topicStatusDetail: string = String(localStorage.getItem('topicStatus'));
    this.topicStatus = JSON.parse(topicStatusDetail);
    console.log(this.topicStatus);
  }
  updateStatus() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.topicStatusService.updateTopicStatus(Number(this.topicStatus.id), this.topicStatus).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.close();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
