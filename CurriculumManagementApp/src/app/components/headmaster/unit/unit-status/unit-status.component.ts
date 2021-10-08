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
  selector: 'app-unit-status',
  templateUrl: './unit-status.component.html',
  styleUrls: ['./unit-status.component.css']
})
export class UnitStatusComponent implements OnInit {
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

  ViewUnitStatusForm = new FormGroup({
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
    }, error => {
      window.alert(error.error.message);
    });
  }

  getSubjects() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      this.subjectService.getSubjets(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        this.subjectAssignList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTopics() {
    let subjectList = this.subject?.value.split("-");
    this.unitService.getUnits(subjectList[1]).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
    this.getStaff();
  }
  getStaff() {
    let assignId: number = Number(this.subject?.value.split("-").shift());
    this.teacherService.getTeacherId(assignId).subscribe(response => {
      let responseBody: Response = response;
      this.staffId = responseBody.data;
      this.teacherService.getStaff(responseBody.data).subscribe(response => {
        let responseBody: Response = response;
        this.teacher = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    })
  }
  getTopicStatus() {
    let unitNo: string = this.unit?.value.split("-").shift();
    this.unitStatusService.getUnitstatusByUnitNo(unitNo, this.staffId, this.roomNo).subscribe(response => {
      let responseBody: Response = response;
      this.unitStatus = responseBody.data;
      this.isHidden = false;
    }, error => {
      this.isHidden = true;
      this.errorMessage = error.error.message;
      window.alert(error.error.message);
    });
  }
  get standard() {
    return this.ViewUnitStatusForm.get('standard');
  }
  get section() {
    return this.ViewUnitStatusForm.get('section');
  }
  get subject() {
    return this.ViewUnitStatusForm.get('subject');
  }
  get unit() {
    return this.ViewUnitStatusForm.get('unit');
  }
  get staff() {
    return this.ViewUnitStatusForm.get('teacher');
  }
}
