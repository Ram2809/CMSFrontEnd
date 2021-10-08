import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Topic } from 'src/app/model/topic';

@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.css']
})
export class ViewTopicComponent implements OnInit {
  public topicList: Topic[] = [];

  constructor(private dialogRef: MatDialogRef<ViewTopicComponent>) { }

  ngOnInit(): void {
    let topics: string = String(localStorage.getItem('topicList'));
    this.topicList = JSON.parse(topics);
  }
  close() {
    this.dialogRef.close();
  }

}
