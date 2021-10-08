import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Response } from 'src/app/model/response';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { TimeTable } from 'src/app/model/time-table';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TimeTableService } from 'src/app/services/time-table.service';

@Component({
  selector: 'app-update-timetable',
  templateUrl: './update-timetable.component.html',
  styleUrls: ['./update-timetable.component.css']
})
export class UpdateTimetableComponent implements OnInit {
  public daysList: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public periodList: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  public roomNo: number = 0;
  public timetable: TimeTable = new TimeTable();
  public existingPeriod: string = "";
  public period: number = 0;
  public day: string = "";
  public subject: string = "";
  public id: number = 0;
  public subjectAssignList: SubjectAssign[] = [];

  constructor(private classService: ClassService,
    private timetableService: TimeTableService,
    private subjectService: SubjectService,
    private dialogRef: MatDialogRef<UpdateTimetableComponent>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.roomNo = Number(localStorage.getItem('roomNo'));
    let responseBody: Response = new Response();
    this.subjectService.getSubjets(this.roomNo).subscribe(response => {
      let responseBody: Response = response;
      this.subjectAssignList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getPeriod() {
    this.timetableService.getTimeTableId(this.roomNo, this.day).subscribe(response => {
      let responseBody: Response = response;
      this.timetable = responseBody.data;
      this.id = Number(this.timetable.id);
      this.timetableService.getPeriod(this.period, this.id).subscribe(response => {
        let responseBody: Response = response;
        this.existingPeriod = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  updateTimetable() {
    let response: boolean = window.confirm("Are you sure to continue?");
    if (response == true) {
      this.timetableService.updatePeriod(this.period, String(this.subject.split("-").pop()), this.id, this.timetable).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.data + " " + responseBody.message);
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  close() {
    let response = window.confirm("Are you sure to close?");
    if (response == true) {
      this.dialogRef.close();
    }
  }
}
