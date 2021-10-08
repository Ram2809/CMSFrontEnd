import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Subject } from 'src/app/model/subject';
import { Response } from 'src/app/model/response';
import { ClassService } from 'src/app/services/class.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/model/unit';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/model/topic';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewTopicComponent } from '../view-topics/view-topics.component';

@Component({
  selector: 'app-view-syllabus',
  templateUrl: './view-syllabus.component.html',
  styleUrls: ['./view-syllabus.component.css']
})
export class ViewSyllabusComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public assignIdList: Number[] = [];
  public subjectCodeList: String[] = [];
  public subjectList: Subject[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public unitList: Unit[] = [];
  public errorMessage: string = "";
  public isHidden: boolean = false;
  public unitNoList: String[] = [];
  public topicList: Array<Array<Topic>> = [];
  ViewCurriculumForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
  });

  constructor(private classService: ClassService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private unitService: UnitService,
    private topicService: TopicService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
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
  getCurriculum() {
    let subjectCode: string = this.subject?.value.split("-").shift();
    console.log(subjectCode);
    this.unitService.getUnits(subjectCode).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
      for (let i in this.unitList) {
        this.unitNoList.push(String(this.unitList[i].unitNo));
      }
      console.log(this.unitNoList);
      this.topicService.getTopicsList(this.unitNoList).subscribe(response => {
        let responseBody: Response = response;
        this.topicList = responseBody.data;
        console.log(this.topicList[0]);
        console.log(this.topicList[0][0]);
      });
      this.isHidden = false;
      this.ViewCurriculumForm.reset();
      console.log(this.unitList);
    }, error => {
      this.errorMessage = error.error.message;
      this.isHidden = true;
      window.alert(error.error.message);
    });
  }
  viewTopic(topicList: Topic[]) {
    if (topicList.length == 0) {
      window.alert("No topics found!");
    }
    else {
      console.log(topicList);
      localStorage.setItem('topicList', JSON.stringify(topicList));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      this.dialog.open(ViewTopicComponent, dialogConfig);
    }
  }
  get standard() {
    return this.ViewCurriculumForm.get('standard');
  }
  get section() {
    return this.ViewCurriculumForm.get('section');
  }
  get subject() {
    return this.ViewCurriculumForm.get('subject');
  }
}
