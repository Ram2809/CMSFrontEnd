import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { TimeTable } from 'src/app/model/time-table';
import { TimeTableService } from 'src/app/services/time-table.service';
import { Response } from 'src/app/model/response';
import { ClassService } from 'src/app/services/class.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateTimetableComponent } from '../update-timetable/update-timetable.component';

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
  public isHidden: boolean = false;
  public errorMessage: string = "";

  ViewTimetableForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
  });

  constructor(private timetableService: TimeTableService,
    private classService: ClassService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTimetable() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      localStorage.setItem('roomNo', String(this.roomNo));
      this.timetableService.getTimeTable(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        this.timetableList = responseBody.data;
        this.isHidden = false;
      }, error => {
        this.errorMessage = error.error.message;
        this.isHidden = true;
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  deleteTimetable() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.roomNo = responseBody.data;
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
  }
  updateTimetable() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateTimetableComponent, dialogConfig);
  }
  get standard() {
    return this.ViewTimetableForm.get('standard');
  }
  get section() {
    return this.ViewTimetableForm.get('section');
  }
}
