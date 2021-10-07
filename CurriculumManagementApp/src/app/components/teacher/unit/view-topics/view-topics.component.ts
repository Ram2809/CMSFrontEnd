import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/model/topic';

@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.css']
})
export class ViewTopicComponent implements OnInit {
  public topicList:Topic[]=[];
  public topicNameList:String[]=[];
  public listLength:number=0;
  constructor() { }

  ngOnInit(): void {
    let topics:string=String(localStorage.getItem('topicList'));
    this.topicList=JSON.parse(topics);
    console.log(this.topicList);
    this.listLength=this.topicList.length;
    for(let i in this.topicList){
      this.topicNameList.push(String(this.topicList[i].name));
    }
  }

}
