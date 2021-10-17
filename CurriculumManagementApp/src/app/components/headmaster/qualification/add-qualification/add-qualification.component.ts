import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Qualification } from 'src/app/model/qualification';
import { Response } from 'src/app/model/response';
import { NotificationService } from 'src/app/services/notification.service';
import { QualificationService } from 'src/app/services/qualification.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.css']
})
export class AddQualificationComponent implements OnInit {

  constructor(private qualificationService:QualificationService,
    private notificationService:NotificationService,
    private matDiaLogRef:MatDialogRef<AddQualificationComponent>) { }

  ngOnInit(): void {
  }
  addQualification(qualification:Qualification){
    console.log(qualification);
    this.qualificationService.addQualification(qualification).subscribe(response=>{
      let responseBody:Response=response;
      this.notificationService.successMessage(responseBody.message!);
      this.close();
    },error=>{
      this.notificationService.errorMessage(error.error.message);
    });
  }
  close(){
    this.matDiaLogRef.close();
  }

}
