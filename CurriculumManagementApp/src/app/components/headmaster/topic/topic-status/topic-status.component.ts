import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Teacher } from 'src/app/model/teacher';
import { Response } from 'src/app/model/response';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { UnitService } from 'src/app/services/unit.service';
import { UnitStatusService } from 'src/app/services/unit-status.service';

import {  UnitStatus } from 'src/app/model/unit-status';
import { Unit } from 'src/app/model/unit';

@Component({
  selector: 'app-topic-status',
  templateUrl: './topic-status.component.html',
  styleUrls: ['./topic-status.component.css']
})
export class TopicStatusComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public roomNo: number = 0;
  public isHidden: boolean = false;
  public subjectAssignList: SubjectAssign[] = [];
  public unitList: Unit[] = [];
  public staffId: number = 0;
  public teacher: Teacher = new Teacher();
  public unitStatus: UnitStatus = new UnitStatus();
  public errorMessage: string = "";
  ViewTopicStatusForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    staff: new FormControl('', Validators.required),
  });
  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private unitService: UnitService,
    private unitStatusService: UnitStatusService) { }

  ngOnInit(): void {
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    }, error => {
      console.log(error);
      let responseBody: Response = error;
      window.alert(error.error.message);
    });
  }

  getSubjects() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      console.log(this.roomNo);
      this.subjectService.getSubjets(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        this.subjectAssignList = responseBody.data;
        console.log(responseBody.data)
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTopics() {
    let splitList = this.subject?.value.split("-");
    console.log(splitList);
    console.log(splitList[1]);
    this.unitService.getUnits(splitList[1]).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
      console.log(this.unitList);
    }, error => {
      window.alert(error.error.message);
    });
    this.getStaff();
  }
  getStaff() {
    let assignId: number = Number(this.subject?.value.split("-").shift());
    console.log(assignId);
    this.teacherService.getTeacherId(assignId).subscribe(response => {
      let responseBody: Response = response;
      this.staffId = responseBody.data;
      console.log(responseBody);
      this.teacherService.getStaff(responseBody.data).subscribe(response => {
        let responseBody: Response = response;
        this.teacher = responseBody.data;
        console.log(this.teacher);
      }, error => {
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    })
  }
  getTopicStatus() {
    let unitNo: string = this.unit?.value.split("-").shift();
    console.log(unitNo);
    console.log(this.staffId);
    console.log(this.roomNo);
    this.unitStatusService.getUnitstatusByUnitNo(unitNo, this.staffId, this.roomNo).subscribe(response => {
      let responseBody: Response = response;
      this.unitStatus = responseBody.data;
      this.isHidden = false;
      console.log(this.unitStatus);
    }, error => {
      this.isHidden = true;
      this.errorMessage = error.error.message;
      window.alert(error.error.message);
    });
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
  get staff() {
    return this.ViewTopicStatusForm.get('teacher');
  }
}
