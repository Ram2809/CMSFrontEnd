import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Major } from 'src/app/model/major';
import { Response } from 'src/app/model/response';
import { MajorService } from 'src/app/services/major.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-major',
  templateUrl: './add-major.component.html',
  styleUrls: ['./add-major.component.css']
})
export class AddMajorComponent implements OnInit {

  constructor(private majorService:MajorService,
    private notificationService:NotificationService,
    private matDialogRef:MatDialogRef<AddMajorComponent>) { }

  ngOnInit(): void {
  }
  addMajor(major:Major){
    console.log(major.name);
    this.majorService.addMajor(major).subscribe(response=>{
      let responseBody:Response=response;
      this.notificationService.successMessage(responseBody.message!);
      this.close();
    },error=>{
      this.notificationService.errorMessage(error.error.message);
    });
  }
  close(){
    this.matDialogRef.close();
  }
}
