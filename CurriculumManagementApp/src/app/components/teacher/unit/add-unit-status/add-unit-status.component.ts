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

  UpdateUnitStatusForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    beginDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    completedDate: new FormControl(''),
    remarks: new FormControl(''),
  });

  constructor(private classService: ClassService,
    private teacherService: TeacherService,
    private unitService: UnitService,
    private subjectService: SubjectService,
    private unitStatusService: UnitStatusService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    })
  }
  getTopics() {
    this.unitService.getUnits(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getSubjects() {
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      this.assignIdList = responseBody.data;
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;
        this.subjectService.getSubjectCodeList(this.assignIdList, this.classRoomNo).subscribe(response => {
          let responseBody: Response = response;
          this.subjectCodeList = responseBody.data;
          this.subjectService.getSubjectList(this.subjectCodeList).subscribe(response => {
            let responseBody: Response = response;
            this.subjectList = responseBody.data;
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
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;
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
          window.alert(responseBody.message);
          this.UpdateUnitStatusForm.reset();
        }, error => {
          window.alert(error.error.message);
        });
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  get standard() {
    return this.UpdateUnitStatusForm.get('standard');
  }
  get section() {
    return this.UpdateUnitStatusForm.get('section');
  }
  get subject() {
    return this.UpdateUnitStatusForm.get('subject');
  }
  get unit() {
    return this.UpdateUnitStatusForm.get('unit');
  }
  get beginDate() {
    return this.UpdateUnitStatusForm.get('beginDate');
  }
  get status() {
    return this.UpdateUnitStatusForm.get('status');
  }
  get completedDate() {
    return this.UpdateUnitStatusForm.get('completedDate');
  }
  get remarks() {
    return this.UpdateUnitStatusForm.get('remarks');
  }
}
