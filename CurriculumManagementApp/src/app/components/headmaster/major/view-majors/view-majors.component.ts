import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Major } from 'src/app/model/major';
import { Response } from 'src/app/model/response';
import { MajorService } from 'src/app/services/major.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AddMajorComponent } from '../add-major/add-major.component';

@Component({
  selector: 'app-view-majors',
  templateUrl: './view-majors.component.html',
  styleUrls: ['./view-majors.component.css']
})
export class ViewMajorsComponent implements OnInit {
  public majorList:Major[]=[];
  constructor(private majorService:MajorService,
    private notificationService:NotificationService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.majorService.getAllMajors().subscribe(response=>{
      let responseBody:Response=response;
      this.majorList=responseBody.data;
      console.log(this.majorList);
    },error=>{
      this.notificationService.errorMessage(error.error.message);
    });
  }
  addMajor(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddMajorComponent, dialogConfig);
  }
  deleteMajor(major:Major){
    console.log(major.id);
    this.majorService.deleteMajor(Number(major.id)).subscribe(response=>{
      let responseBody:Response=response;
      this.notificationService.successMessage(String(responseBody.message));
    },error=>{
      this.notificationService.errorMessage(error.error.message);
    });
  }
}
