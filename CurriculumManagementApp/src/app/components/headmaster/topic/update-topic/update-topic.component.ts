import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/model/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Response } from 'src/app/model/response';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.css']
})
export class UpdateTopicComponent implements OnInit {
  public topic: Topic = new Topic();
  constructor(private topicService: TopicService,
    private dialogRef: MatDialogRef<UpdateTopicComponent>) { }

  ngOnInit(): void {
    let topicId: number = Number(localStorage.getItem('topicId'));
    console.log(topicId);
    this.topicService.getTopic(topicId).subscribe(response => {
      let responseBody: Response = response;
      this.topic = responseBody.data;
      console.log(this.topic);
    }, error => {
      window.alert(error.error.message);
    })
  }
  updateTopic() {
    let response = window.confirm("Are you sure want to continue?");
    if (response) {
      this.topicService.updateTopic(Number(this.topic.id), this.topic).subscribe(response => {
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
