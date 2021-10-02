import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HeadMaster } from 'src/app/model/head-master';
import { HeadMasterService } from 'src/app/services/head-master.service';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-admin-update-profile',
  templateUrl: './admin-update-profile.component.html',
  styleUrls: ['./admin-update-profile.component.css']
})
export class AdminUpdateProfileComponent implements OnInit {
  public qualificationList: String[] = ['B.Ed', 'Ph.D', 'M.Phil', 'M.Sc', 'M.A', 'B.Sc', 'B.A', 'B.Com', 'M.Com'];
  public majorList: String[] = ['Tamil', 'English', 'Maths', 'History', 'Physics', 'Chemistry', 'Computer Science', 'Botany', 'Zoology', 'Physical Education', 'Hindi'];
  public headMaster:HeadMaster=new HeadMaster();
  constructor(private headMasterService:HeadMasterService,
    public dialogRef: MatDialogRef<AdminUpdateProfileComponent>) { }

  ngOnInit(): void {
    let user:string=String(localStorage.getItem('admin'));
    let headMasterDetail:HeadMaster=JSON.parse(user);
    console.log(headMasterDetail);
    this.headMasterService.getHeadMaster(String(headMasterDetail.email)).subscribe(response=>{
      let responseBody:Response=response;
      this.headMaster=responseBody.data;
    },error=>{
      window.alert(error.error.message);
    })
  }
  updateHeadmaster(){
    this.headMasterService.updateHeadMaster(Number(this.headMaster.id),this.headMaster).subscribe(response=>{
      let responseBody:Response=response;
      window.alert(responseBody.message);
      this.close();
      this.ngOnInit();
    },error=>{
      window.alert(error.error.message);
    });
  }
  close(){
    this.dialogRef.close();
    this.ngOnInit();
  }

}
