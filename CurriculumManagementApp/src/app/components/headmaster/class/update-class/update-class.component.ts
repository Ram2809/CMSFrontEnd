import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent implements OnInit {
  public classDetail: Class = new Class();
  public roomNo: number = 0;

  constructor(private classService: ClassService,
    private dialogRef: MatDialogRef<UpdateClassComponent>) { }

  ngOnInit(): void {
    this.classDetail = new Class();
    this.roomNo = Number(localStorage.getItem('roomNo'));
    this.classService.getClass(this.roomNo).subscribe(response => {
      console.log(response);
      let responseBody: Response = response;
      this.classDetail = responseBody.data
      console.log(this.classDetail);
    }, error => {
      window.alert(error.error.message);
    });
  }
  updateClass() {
    console.log(this.roomNo);
    console.log(this.classDetail);
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.classService.updateClass(this.roomNo, this.classDetail).subscribe(response => {
        console.log(response);
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.close();
      }, error => {
        window.alert(error.error.message);
      });
    }
    this.ngOnInit();
  }
  close(){
    this.dialogRef.close();
  }
}
