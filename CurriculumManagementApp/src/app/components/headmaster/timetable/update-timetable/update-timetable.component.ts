import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { TimeTable } from 'src/app/model/time-table';
import { ClassService } from 'src/app/services/class.service';
import { TimeTableService } from 'src/app/services/time-table.service';
@Component({
  selector: 'app-update-timetable',
  templateUrl: './update-timetable.component.html',
  styleUrls: ['./update-timetable.component.css']
})
export class UpdateTimetableComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public daysList: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public roomNo: number = 0;
  public timetable: TimeTable = new TimeTable();
  public periods:any=[];
  public standard:string="";
  public section:string="";
  public day:string="";
  // UpdateTimeTableForm = new FormGroup({
  //   standard: new FormControl('', Validators.required),
  //   section: new FormControl('', Validators.required),
  //   day: new FormControl('', Validators.required),
  // });
  constructor(private classService: ClassService,
    private timetableService: TimeTableService) { }

  ngOnInit(): void {
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    }, error => {
      console.log(error);
      let responseBody: Response = error;
      window.alert(error.error.message);
    });
  }
  getTimetable() {
    this.classService.getClassRoomNo(this.standard, this.section).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      console.log(this.roomNo);
      this.timetableService.getTimeTableByDay(this.roomNo, this.day).subscribe(response => {
        let responseBody: Response = response;
        this.timetable = responseBody.data;
        console.log(this.timetable);
      }, error => {
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    });
  }
  // get standard() {
  //   return this.UpdateTimeTableForm.get('standard');
  // }
  // get section() {
  //   return this.UpdateTimeTableForm.get('section');
  // }
  // get day() {
  //   return this.UpdateTimeTableForm.get('day');
  // }
  updateTt(){
    console.log(this.timetable);
  }
}
