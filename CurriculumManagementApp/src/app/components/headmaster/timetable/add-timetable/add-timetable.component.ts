import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { Class } from 'src/app/model/class';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { TimeTable } from 'src/app/model/time-table';
import { TimeTableService } from 'src/app/services/time-table.service';
import { TSMap } from 'typescript-map';
@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public daysList: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public classList: Class[] = [];
  public subjectAssignList: SubjectAssign[] = [];
  public periodsMap: TSMap<Number, String> = new TSMap();
  public roomNo: number = 0;
  AddTimetableForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required),
    period: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
  });
  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private timetableService: TimeTableService) { }

  ngOnInit(): void {
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    })
  }
  getSubjects() {
    let responseBody: Response = new Response();
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.data);
      this.roomNo = responseBody.data;
      this.subjectService.getSubjets(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody.data);
        this.subjectAssignList = responseBody.data;
      });
    });
  }
  addPeriod() {
    this.periodsMap.set(this.period?.value, this.subject?.value.split("-").pop());
    console.log(this.periodsMap);
    return this.periodsMap.toJSON();
  }
  addTimetable() {
    console.log(this.addPeriod());
    const timetable: TimeTable = new TimeTable();
    timetable.day = this.day?.value;
    timetable.periods = this.addPeriod();
    console.log(timetable.periods);
    const classDetail = new Class();
    classDetail.roomNo = this.roomNo;
    timetable.classDetail = classDetail;
    console.log(timetable);
    this.timetableService.addTimetable(timetable).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.message);
      window.alert(responseBody.message);
    });
  }
  get standard() {
    return this.AddTimetableForm.get('standard');
  }
  get section() {
    return this.AddTimetableForm.get('section');
  }
  get day() {
    return this.AddTimetableForm.get('day');
  }
  get period() {
    return this.AddTimetableForm.get('period');
  }
  get subject() {
    return this.AddTimetableForm.get('subject');
  }
}
