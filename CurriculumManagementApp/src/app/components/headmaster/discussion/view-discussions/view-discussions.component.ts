import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { UnitService } from 'src/app/services/unit.service';
import { Response } from 'src/app/model/response';
import { Unit } from 'src/app/model/unit';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Discussion } from 'src/app/model/discussion';
import { DiscussionService } from 'src/app/services/discussion.service';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/model/topic';

@Component({
  selector: 'app-view-discussions',
  templateUrl: './view-discussions.component.html',
  styleUrls: ['./view-discussions.component.css']
})
export class ViewDiscussionsComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public unitList: Unit[] = [];
  public classList: Class[] = [];
  public subjectList: Subject[] = [];
  public subjectAssignList: SubjectAssign[] = [];
  public roomNo: number = 0;
  public discussionList: Discussion[] = [];
  public errorMessage: string = "";
  public isHidden: boolean = false;
  public topicList:Topic[]=[];

  ViewDiscussionForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    topic:new FormControl('',Validators.required),
  })
  constructor(private classService: ClassService,
    private unitService: UnitService,
    private subjectService: SubjectService,
    private topicService:TopicService,
    private discussionService: DiscussionService) { }

  ngOnInit(): void {
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    })
  }
  getSubjects() {
    let responseBody: Response = new Response();
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      responseBody = response;
      this.roomNo = responseBody.data;
      this.subjectService.getSubjets(this.roomNo).subscribe(response => {
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
    console.log(this.subject?.value.split("-").shift());
    this.unitService.getUnits(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTopics() {
    this.topicService.getTopics(this.unit?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.topicList = responseBody.data;
      console.log(this.topicList);
    }, error => {
      window.alert(error.error.message);
    });
  }
  getDiscussions() {
    let topicNo = this.topic?.value.split("-").shift();
    console.log(topicNo);
    this.discussionService.getDiscussionByRoomNo(topicNo, this.roomNo).subscribe(response => {
      let responseBody: Response = response;
      this.discussionList = responseBody.data;
      this.isHidden = false;
    }, error => {
      this.isHidden = true;
      this.errorMessage = error.error.message;
      window.alert(error.error.message);
    })
  }
  get standard() {
    return this.ViewDiscussionForm.get('standard');
  }
  get section() {
    return this.ViewDiscussionForm.get('section');
  }
  get subject() {
    return this.ViewDiscussionForm.get('subject');
  }
  get unit() {
    return this.ViewDiscussionForm.get('unit');
  }
  get topic() {
    return this.ViewDiscussionForm.get('topic');
  }
}
