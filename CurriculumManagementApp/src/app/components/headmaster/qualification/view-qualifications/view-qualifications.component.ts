import { Component, OnInit } from '@angular/core';
import { Qualification } from 'src/app/model/qualification';
import { NotificationService } from 'src/app/services/notification.service';
import { QualificationService } from 'src/app/services/qualification.service';
import { Response } from 'src/app/model/response';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddQualificationComponent } from '../add-qualification/add-qualification.component';

@Component({
  selector: 'app-view-qualifications',
  templateUrl: './view-qualifications.component.html',
  styleUrls: ['./view-qualifications.component.css']
})
export class ViewQualificationsComponent implements OnInit {
  public qualificationList:Qualification[]=[];
  constructor(private qualificationService:QualificationService,
    private notificationService:NotificationService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.qualificationService.getQualifications().subscribe(response=>{
      let responseBody:Response=response;
      this.qualificationList=responseBody.data;
      console.log(this.qualificationList);
    },error=>{
      this.notificationService.errorMessage(error.error.message);
    });
  }
  addQualification(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddQualificationComponent, dialogConfig);
  }
  deleteQualification(qualification:Qualification){
    this.qualificationService.deleteQualification(Number(qualification.id)).subscribe(response=>{
      let responseBody:Response=response;
      this.notificationService.successMessage(responseBody.message!);
      this.ngOnInit();
    },error=>{
      this.notificationService.errorMessage(error.error.message);
    });
  }

}
