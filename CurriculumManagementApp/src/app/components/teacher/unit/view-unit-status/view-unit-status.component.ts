import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Unit } from 'src/app/model/unit';
import {UnitStatus } from 'src/app/model/unit-status';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import {  UnitStatusService } from 'src/app/services/unit-status.service';
import { UnitService } from 'src/app/services/unit.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateUnitStatusComponent } from '../update-unit-status/update-unit-status.component';

@Component({
  selector: 'app-view-unit-status',
  templateUrl: './view-unit-status.component.html',
  styleUrls: ['./view-unit-status.component.css']
})
export class ViewUnitStatusComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public assignIdList: Number[] = [];
  public subjectCodeList: String[] = [];
  public subjectList: Subject[] = [];
  public unitList: Unit[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public unitStatus: UnitStatus = new UnitStatus();
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
    private unitService: UnitService,
    private unitStatusService: UnitStatusService,
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
    this.unitService.getUnits(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
      console.log(this.unitList);
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
      this.unitStatusService.getUnitstatusByUnitNo(this.unit?.value.split("-").shift(), this.staffId, this.classRoomNo).subscribe(response => {
        let responseBody: Response = response;
        this.unitStatus = responseBody.data;
        console.log(this.unitStatus);
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
      this.unitStatusService.deleteUnitStatus(Number(this.unitStatus.id)).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.getTopicStatus();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  updateStatus() {
    localStorage.setItem('topicStatus', JSON.stringify(this.unitStatus));
    console.log(this.unitStatus.id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateUnitStatusComponent, dialogConfig)
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
