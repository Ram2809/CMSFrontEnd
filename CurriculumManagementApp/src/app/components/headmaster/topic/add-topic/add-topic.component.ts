import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Topic } from 'src/app/model/topic';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TopicService } from 'src/app/services/topic.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public monthList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public subjectAssignList:SubjectAssign[]=[];
  AddTopicForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    unitNo: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    unitName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    subject:new FormControl('',Validators.required),
  });
  constructor(private classService:ClassService,
    private subjectService:SubjectService,
    private topicService:TopicService) { }

  ngOnInit(): void {
  }
  addTopic() {
    console.log(this.subject?.value.split("-").shift());
    const topic:Topic=new Topic();
    topic.unitNo=this.unitNo?.value;
    topic.unitName=this.unitName?.value;
    topic.description=this.description?.value;
    topic.month=this.month?.value;
    const subject:Subject=new Subject();
    subject.code=this.subject?.value.split("-").shift();
    topic.subject=subject;
    this.topicService.addTopic(topic).subscribe(response=>{
      let responseBody:Response=response;
      console.log(responseBody);
      window.alert(responseBody.message);
    })
  }
  getSubjects()
  {
    let responseBody:Response=new Response();
    let classList:Class[]=[];
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response=>{
      responseBody=response;
      classList=responseBody.data;
      this.subjectService.getSubjets(Number(classList[0].roomNo)).subscribe(response=>{
        responseBody=response;
        console.log(response.data);
        this.subjectAssignList=responseBody.data;
      });
    });
  }
  get standard() {
    return this.AddTopicForm.get('standard');
  }
  get unitNo() {
    return this.AddTopicForm.get('unitNo');
  }
  get unitName() {
    return this.AddTopicForm.get('unitName');
  }
  get description() {
    return this.AddTopicForm.get('description');
  }
  get month() {
    return this.AddTopicForm.get('month');
  }
  get subject(){
    return this.AddTopicForm.get('subject');
  }
}
