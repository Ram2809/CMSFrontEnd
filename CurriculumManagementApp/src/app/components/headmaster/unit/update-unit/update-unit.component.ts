import { Component, OnInit } from '@angular/core';
import {  UnitService } from 'src/app/services/unit.service';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { MatDialogRef } from '@angular/material/dialog';
import { Unit } from 'src/app/model/unit';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.css']
})
export class UpdateUnitComponent implements OnInit {
  public unit: Unit = new Unit();
  public unitNo: string = "";
  public monthList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private unitService: UnitService,
    private dialogRef: MatDialogRef<UpdateUnitComponent>) { }

  ngOnInit(): void {
    this.unitNo = String(localStorage.getItem('unitNo'));
    console.log(this.unitNo);
    this.unitService.getUnit(this.unitNo).subscribe(response => {
      let responseBody: Response = response;
      this.unit = responseBody.data;
      console.log(this.unit);
    })
  }
  updateUnit() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const subject: Subject = new Subject();
      this.unitService.getSubjectByUnit(this.unitNo).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody.data);
        subject.code = responseBody.data;
        this.unit.subject = subject;
        this.unitService.updateUnit(this.unitNo, this.unit).subscribe(response => {
          let responseBody: Response = response;
          console.log(responseBody);
          window.alert(responseBody.message);
          this.close();
        }, error => {
          window.alert(error.error.message);
        });
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
