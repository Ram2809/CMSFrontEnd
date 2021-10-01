import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { TimeTable } from 'src/app/model/time-table';
import { TimeTableService } from 'src/app/services/time-table.service';
import { Response } from 'src/app/model/response';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public timetableList: TimeTable[] = [];
  public classList: Class[] = [];
  public roomNo: number = 0;
  ViewTimetableForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
  })
  constructor(private timetableService: TimeTableService,
    private classService: ClassService) { }

  ngOnInit(): void {

  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    }, error => {
      window.alert(error.error.message);
    });
  }
  getClassRoom() {

  }
  getTimetable() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.data);
      this.roomNo = responseBody.data;
      localStorage.setItem('roomNo',String(this.roomNo));
      console.log(this.roomNo);
      this.timetableService.getTimeTable(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        this.timetableList = responseBody.data;
        console.log(this.timetableList);
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  deleteTimetable() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.data);
      this.roomNo = responseBody.data;
      console.log(this.roomNo);
      this.timetableService.deleteTimetable(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  get standard() {
    return this.ViewTimetableForm.get('standard');
  }
  get section() {
    return this.ViewTimetableForm.get('section');
  }
}
