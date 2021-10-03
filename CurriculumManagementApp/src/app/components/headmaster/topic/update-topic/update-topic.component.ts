import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/model/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Response } from 'src/app/model/response';
import { Router } from '@angular/router';
import { Subject } from 'src/app/model/subject';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.css']
})
export class UpdateTopicComponent implements OnInit {
  public topic: Topic = new Topic();
  public unitNo: string = "";
  public monthList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private topicService: TopicService,
    private dialogRef:MatDialogRef<UpdateTopicComponent>) { }

  ngOnInit(): void {
    this.unitNo = String(localStorage.getItem('unitNo'));
    console.log(this.unitNo);
    this.topicService.getTopic(this.unitNo).subscribe(response => {
      let responseBody: Response = response;
      this.topic = responseBody.data;
      console.log(this.topic);
    })
  }
  updateUnit() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const subject: Subject = new Subject();
      this.topicService.getSubjectByUnit(this.unitNo).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody.data);
        subject.code = responseBody.data;
        this.topic.subject = subject;
        this.topicService.updateTopic(this.unitNo, this.topic).subscribe(response => {
          let responseBody: Response = response;
          console.log(responseBody);
          window.alert(responseBody.message);
          this.close();
        }, error => {
          window.alert(error.error.message);
        });
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  close(){
    this.dialogRef.close();
  }
}
