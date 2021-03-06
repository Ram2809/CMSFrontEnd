import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Unit } from 'src/app/model/unit';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TopicService } from 'src/app/services/topic.service';
import { UnitService } from 'src/app/services/unit.service';
import { Response } from 'src/app/model/response';
import { Topic } from 'src/app/model/topic';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateTopicComponent } from '../update-topic/update-topic.component';
@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.css']
})
export class ViewTopicsComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public subjectAssignList: SubjectAssign[] = [];
  public unitList: Unit[] = [];
  public topicList:Topic[]=[];
  public errorMessage:String='';
  public isHidden:boolean=false;

  ViewTopicsForm=new FormGroup({
    standard:new FormControl('',Validators.required),
    subject:new FormControl('',Validators.required),
    unit:new FormControl('',Validators.required),
  });
  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private unitService: UnitService,
    private topicService:TopicService,
    private dialog:MatDialog) { }

  getSubjects() {
    let responseBody: Response = new Response();
    let classList: Class[] = [];
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      responseBody = response;
      classList = responseBody.data;
      this.subjectService.getSubjets(Number(classList[0].roomNo)).subscribe(response => {
        responseBody = response;
        this.subjectAssignList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  getUnits() {
    this.unitService.getUnits(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  viewTopics(){
    this.topicService.getTopics(this.unit?.value.split("-").shift()).subscribe(response=>{
      let responseBody:Response=response;
      this.topicList=responseBody.data;
      this.isHidden=false;
    },error=>{
      this.isHidden=true;
      this.errorMessage="No topics found!";
      window.alert("No topics found!");
    })
  }
  updateTopic(topic:Topic){
    localStorage.setItem('topicId',String(topic.id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateTopicComponent, dialogConfig);
  }
  // deleteTopic(topic:Topic){
  //   let response:boolean=window.confirm("Are you sure want to continue?");
  //   if(response){
  //     this.topicService.deleteTopic(Number(topic.id)).subscribe(response=>{
  //       let responseBody:Response=response;
  //       window.alert(responseBody.message);
  //       this.viewTopics();
  //     },error=>{
  //       window.alert(error.error.message);
  //     });
  //   }
  // }
  ngOnInit(): void {
  }
  get standard(){
    return this.ViewTopicsForm.get('standard');
  }
  get subject(){
    return this.ViewTopicsForm.get('subject');
  }
  get unit(){
    return this.ViewTopicsForm.get('unit');
  }
}
