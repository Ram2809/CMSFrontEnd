import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TimeTableService } from 'src/app/services/time-table.service';
import { Response } from 'src/app/model/response';
import { TimeTable } from 'src/app/model/time-table';

@Component({
  selector: 'app-staff-view-timetable',
  templateUrl: './staff-view-timetable.component.html',
  styleUrls: ['./staff-view-timetable.component.css']
})
export class StaffViewTimetableComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public assignIdList: Number[] = [];
  public classList: Class[] = [];
  public roomNoList: Number[] = [];
  public classRoomNo: number = 0;
  public errorMessage: string = "";
  public isHidden: boolean = false;
  public timetableList: TimeTable[] = [];

  ViewTimeTableForm = new FormGroup({
    class: new FormControl('', Validators.required),
  });

  constructor(private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classService: ClassService,
    private timetableService: TimeTableService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      this.assignIdList = responseBody.data;
      this.subjectService.getRoomNoList(this.assignIdList).subscribe(response => {
        let responseBody: Response = response;
        this.roomNoList = responseBody.data;
        this.classService.getClassList(this.roomNoList).subscribe(response => {
          let responseBody: Response = response;
          this.classList = responseBody.data;
        }, error => {
          window.alert(error.error.message);
        })
      }, error => {
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    });
  }

  getTimetable() {
    let standard: string = this.class?.value.split("-").shift();
    let section: string = this.class?.value.split("-").pop();
    this.classService.getClassRoomNo(standard, section).subscribe(response => {
      let responseBody: Response = response;
      this.classRoomNo = responseBody.data;
      this.timetableService.getTimeTable(this.classRoomNo).subscribe(response => {
        let responseBody: Response = response;
        this.timetableList = responseBody.data;
        this.isHidden = false;
      }, error => {
        this.isHidden = true;
        this.errorMessage = error.error.message;
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  get class() {
    return this.ViewTimeTableForm.get('class');
  }
}
