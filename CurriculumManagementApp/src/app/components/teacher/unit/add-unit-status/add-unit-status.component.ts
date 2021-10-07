import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Unit } from 'src/app/model/unit';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { TeacherService } from 'src/app/services/teacher.service';
import { UnitService } from 'src/app/services/unit.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UnitStatus } from 'src/app/model/unit-status';
import { Teacher } from 'src/app/model/teacher';
import { UnitStatusService } from 'src/app/services/unit-status.service';
@Component({
  selector: 'app-add-unit-status',
  templateUrl: './add-unit-status.component.html',
  styleUrls: ['./add-unit-status.component.css']
})
export class AddUnitStatusComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public assignIdList: Number[] = [];
  public subjectCodeList: String[] = [];
  public subjectList: Subject[] = [];
  public unitList: Unit[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;

  UpdateTopicStatusForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    beginDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    completedDate: new FormControl(''),
    remarks: new FormControl(''),
  })
  constructor(private classService: ClassService,
    private teacherService: TeacherService,
    private unitService: UnitService,
    private subjectService: SubjectService,
    private unitStatusService: UnitStatusService) { }

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
  addTopicStatus() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      let unitNo: string = this.unit?.value.split("-").shift();
      console.log(unitNo);
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;
        console.log(this.classRoomNo);
        const unitStatus: UnitStatus = new UnitStatus();
        unitStatus.beginDate = this.beginDate?.value;
        unitStatus.status = this.status?.value;
        unitStatus.completedDate = this.completedDate?.value;
        unitStatus.remarks = this.remarks?.value;
        const unit: Unit = new Unit();
        unit.unitNo = unitNo;
        const teacher: Teacher = new Teacher();
        teacher.id = this.staffId;
        const classDetail: Class = new Class();
        classDetail.roomNo = this.classRoomNo;
        unitStatus.unit = unit;
        unitStatus.teacher = teacher;
        unitStatus.classDetail = classDetail;
        this.unitStatusService.addUnitStatus(unitStatus).subscribe(response => {
          let responseBody: Response = response;
          console.log(responseBody.message);
          window.alert(responseBody.message);
          this.UpdateTopicStatusForm.reset();
        }, error => {
          window.alert(error.error.message);
        });
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  get standard() {
    return this.UpdateTopicStatusForm.get('standard');
  }
  get section() {
    return this.UpdateTopicStatusForm.get('section');
  }
  get subject() {
    return this.UpdateTopicStatusForm.get('subject');
  }
  get unit() {
    return this.UpdateTopicStatusForm.get('unit');
  }
  get beginDate() {
    return this.UpdateTopicStatusForm.get('beginDate');
  }
  get status() {
    return this.UpdateTopicStatusForm.get('status');
  }
  get completedDate() {
    return this.UpdateTopicStatusForm.get('completedDate');
  }
  get remarks() {
    return this.UpdateTopicStatusForm.get('remarks');
  }
}
