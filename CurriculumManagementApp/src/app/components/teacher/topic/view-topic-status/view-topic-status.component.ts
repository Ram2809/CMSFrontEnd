import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Topic } from 'src/app/model/topic';
import { TopicStatus } from 'src/app/model/topic-status';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TopicStatusService } from 'src/app/services/topic-status.service';
import { TopicService } from 'src/app/services/topic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateTopicStatusComponent } from '../update-topic-status/update-topic-status.component';

@Component({
  selector: 'app-view-topic-status',
  templateUrl: './view-topic-status.component.html',
  styleUrls: ['./view-topic-status.component.css']
})
export class ViewTopicStatusComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public assignIdList: Number[] = [];
  public subjectCodeList: String[] = [];
  public subjectList: Subject[] = [];
  public topicList: Topic[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public topicStatus: TopicStatus = new TopicStatus();
  public isHidden: boolean = false;
  public errorMessage: string = "";

  ViewTopicStatusForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
  })

  constructor(private classService: ClassService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private topicStatusService: TopicStatusService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    console.log(this.staffId);
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
  getSubjects() {
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody);
      this.assignIdList = responseBody.data;
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;
        console.log(this.classRoomNo);
        this.subjectService.getSubjectCodeList(this.assignIdList, this.classRoomNo).subscribe(response => {
          let responseBody: Response = response;
          this.subjectCodeList = responseBody.data;
          console.log(this.subjectCodeList);
          this.subjectService.getSubjectList(this.subjectCodeList).subscribe(response => {
            let responseBody: Response = response;
            this.subjectList = responseBody.data;
            console.log(this.subjectList);
          }, error => {
            window.alert(error.error.message);
          })
        }, error => {
          window.alert(error.error.message);
        })
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTopicStatus() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classRoomNo = responseBody.data;
      console.log(this.classRoomNo);
      this.topicStatusService.getTopicStatusByUnitNo(this.unit?.value.split("-").shift(), this.staffId, this.classRoomNo).subscribe(response => {
        let responseBody: Response = response;
        this.topicStatus = responseBody.data;
        console.log(this.topicStatus);
        this.isHidden = false;
      }, error => {
        this.errorMessage = error.error.messsage;
        this.isHidden = true;
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  deleteStatus() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.topicStatusService.deleteTopicStatus(Number(this.topicStatus.id)).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.getTopicStatus();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  updateStatus() {
    localStorage.setItem('topicStatus', JSON.stringify(this.topicStatus));
    console.log(this.topicStatus.id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateTopicStatusComponent, dialogConfig)
  }
  get standard() {
    return this.ViewTopicStatusForm.get('standard');
  }
  get section() {
    return this.ViewTopicStatusForm.get('section');
  }
  get subject() {
    return this.ViewTopicStatusForm.get('subject');
  }
  get unit() {
    return this.ViewTopicStatusForm.get('unit');
  }
}
