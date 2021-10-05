import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { TopicService } from 'src/app/services/topic.service';
import { Response } from 'src/app/model/response';
import { Topic } from 'src/app/model/topic';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Discussion } from 'src/app/model/discussion';
import { DiscussionService } from 'src/app/services/discussion.service';

@Component({
  selector: 'app-view-discussions',
  templateUrl: './view-discussions.component.html',
  styleUrls: ['./view-discussions.component.css']
})
export class ViewDiscussionsComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public topicList: Topic[] = [];
  public classList: Class[] = [];
  public subjectList: Subject[] = [];
  public subjectAssignList: SubjectAssign[] = [];
  public roomNo: number = 0;
  public discussionList: Discussion[] = [];
  public errorMessage: string = "";
  public isHidden: boolean = false;
  public currentPage: number = 1;
  public totalDisucussions: string = "";
  public maxSize: string = String(1);
  ViewDiscussionForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
  })
  constructor(private classService: ClassService,
    private topicService: TopicService,
    private subjectService: SubjectService,
    private discussionService: DiscussionService) { }

  ngOnInit(): void {
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
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
        console.log(response.data);
        this.subjectAssignList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTopics() {
    console.log(this.subject?.value.split("-").shift());
    this.topicService.getTopics(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.topicList = responseBody.data;
      console.log(this.topicList);
    }, error => {
      window.alert(error.error.message);
    });
  }
  getDiscussions() {
    let unitNo = this.unit?.value.split("-").shift();
    console.log(this.roomNo);
    this.discussionService.getDiscussionByRoomNo(unitNo, this.roomNo).subscribe(response => {
      let responseBody: Response = response;
      this.discussionList = responseBody.data;
      this.isHidden = false;
      console.log(this.discussionList);
      this.totalDisucussions = String(this.discussionList.length);
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
}
