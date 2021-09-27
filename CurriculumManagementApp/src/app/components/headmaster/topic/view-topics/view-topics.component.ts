import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { SubjectService } from 'src/app/services/subject.service';
import { Topic } from 'src/app/model/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.css']
})
export class ViewTopicsComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public subjectAssignList:SubjectAssign[]=[];
  public topicList:Topic[]=[];
  public isHidden:boolean=false;
  ViewTopicsForm=new FormGroup({
    standard:new FormControl('',Validators.required),
    subject:new FormControl('',Validators.required),
    option:new FormControl('')
  });
  constructor(private classService:ClassService,
    private subjectService:SubjectService,
    private topicService:TopicService,
    private router:Router) { }

  ngOnInit(): void {
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
  getUnits()
  {
    let subjectCode:string=this.subject?.value.split("-").shift();
    console.log(subjectCode);
    this.topicService.getTopics(subjectCode).subscribe(response=>{
      let responseBody:Response=response;
      this.topicList=responseBody.data;
      console.log(this.topicList);
    },error=>{
      console.log(error.message);
      window.alert(error.message);
    });
    this.isHidden=true;
    // if(this.topicList.length<=0)
    // {
    //   this.isHidden=false;
    // }
  }
  backToMain()
  {
    this.router.navigate(['admin']);
  }
  updateUnit()
  {
    localStorage.setItem('unitNo',this.option?.value);
    this.router.navigate(['admin/updatetopic']);
  }
  deleteUnit()
  {
    console.log(this.option?.value);
    this.topicService.deleteTopic(this.option?.value).subscribe(response=>{
      let responseBody:Response=response;
      console.log(responseBody);
      window.alert(responseBody.message);
      this.getUnits;
    });
  }
  get standard(){
    return this.ViewTopicsForm.get('standard');
  }
  get subject(){
    return this.ViewTopicsForm.get('subject');
  }
  get option(){
    return this.ViewTopicsForm.get('option');
  }
}
