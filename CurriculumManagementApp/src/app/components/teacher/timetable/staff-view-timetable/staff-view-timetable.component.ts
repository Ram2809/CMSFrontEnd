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
  public staffId: number = 1002;
  public assignIdList: SubjectAssign[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public errorMessage: string = "";
  public isHidden: boolean = false;
  public timetableList: TimeTable[] = [];

  ViewTimeTableForm = new FormGroup({
    class: new FormControl('', Validators.required),
  })
  constructor(private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classService: ClassService,
    private timetableService: TimeTableService) { }

  ngOnInit(): void {
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody);
      this.assignIdList = responseBody.data;
      for (let i in this.assignIdList) {
        this.subjectService.getRoomNo(Number(this.assignIdList[i])).subscribe(response => {
          let responseBody: Response = response;
          let roomNo: number = responseBody.data;
          console.log(roomNo)
          this.classService.getClass(roomNo).subscribe(response => {
            let responseBody: Response = response;
            this.classList.push(responseBody.data);
            console.log(this.classList);
          }, error => {
            window.alert(error.error.message);
          })
        }, error => {
          window.alert(error.error.message);
        });
      }
    }, error => {
      window.alert(error.error.message);
    })
  }
  getTimetable() {
    console.log(this.class?.value);
    let standard: string = this.class?.value.split("-").shift();
    let section: string = this.class?.value.split("-").pop();
    this.classService.getClassRoomNo(standard,section).subscribe(response=>{
      let responseBody:Response=response;
      this.classRoomNo=responseBody.data;
      console.log(this.classRoomNo);
      this.timetableService.getTimeTable(this.classRoomNo).subscribe(response=>{
        let responseBody:Response=response;
        this.timetableList=responseBody.data;
        this.isHidden=false;
        console.log(this.timetableList);
      },error=>{
        this.isHidden=true;
        this.errorMessage=error.error.message;
        window.alert(error.error.message);
      });
    },error=>{
      window.alert(error.error.message);
    });
  }
  get class() {
    return this.ViewTimeTableForm.get('class');
  }
}