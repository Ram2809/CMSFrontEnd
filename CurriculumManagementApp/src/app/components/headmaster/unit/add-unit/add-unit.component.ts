import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';

import { Response } from 'src/app/model/response';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/model/unit';
@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public monthList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public subjectAssignList: SubjectAssign[] = [];

  AddUnitForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    unitNo: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    unitName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
  });

  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private unitService: UnitService) { }

  ngOnInit(): void {
  }
  addTopic() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const unit: Unit = new Unit();
      unit.unitNo = this.unitNo?.value;
      unit.unitName = this.unitName?.value;
      unit.description = this.description?.value;
      unit.month = this.month?.value;
      const subject: Subject = new Subject();
      subject.code = this.subject?.value.split("-").shift();
      unit.subject = subject;
      this.unitService.addUnit(unit).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.AddUnitForm.reset();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  getSubjects() {
    let responseBody: Response = new Response();
    let classList: Class[] = [];
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      responseBody = response;
      classList = responseBody.data;
      this.subjectService.getSubjets(Number(classList[0].roomNo)).subscribe(response => {
        responseBody = response;
        this.subjectAssignList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  get standard() {
    return this.AddUnitForm.get('standard');
  }
  get unitNo() {
    return this.AddUnitForm.get('unitNo');
  }
  get unitName() {
    return this.AddUnitForm.get('unitName');
  }
  get description() {
    return this.AddUnitForm.get('description');
  }
  get month() {
    return this.AddUnitForm.get('month');
  }
  get subject() {
    return this.AddUnitForm.get('subject');
  }
}
