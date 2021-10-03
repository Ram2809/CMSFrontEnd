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
  public topicList: Topic[] = [];
  public isHidden: boolean = false;
  public errorMessage:string="";

  ViewTopicsForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    option: new FormControl('')
  });

  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  getSubjects() {
    let responseBody: Response = new Response();
    let classList: Class[] = [];
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      responseBody = response;
      classList = responseBody.data;
      this.subjectService.getSubjets(Number(classList[0].roomNo)).subscribe(response => {
        responseBody = response;
        console.log(response.data);
        this.subjectAssignList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  getUnits() {
    let subjectCode: string = this.subject?.value.split("-").shift();
    console.log(subjectCode);
    this.topicService.getTopics(subjectCode).subscribe(response => {
      let responseBody: Response = response;
      this.topicList = responseBody.data;
      this.isHidden=false;
      console.log(this.topicList);
    }, error => {
      this.isHidden=true;
      this.errorMessage=error.error.message;
      window.alert(error.error.message);
    });
  }
  updateUnit() {
    localStorage.setItem('unitNo', this.option?.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateTopicComponent, dialogConfig)
  }
  deleteUnit() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      console.log(this.option?.value);
      this.topicService.deleteTopic(this.option?.value).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody);
        window.alert(responseBody.message);
        this.getUnits();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  get standard() {
    return this.ViewTopicsForm.get('standard');
  }
  get subject() {
    return this.ViewTopicsForm.get('subject');
  }
  get option() {
    return this.ViewTopicsForm.get('option');
  }
}
