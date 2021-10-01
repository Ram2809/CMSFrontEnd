import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/model/address';
import { StaffUpdateProfileComponent } from '../staff-update-profile/staff-update-profile.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-view-profile',
  templateUrl: './staff-view-profile.component.html',
  styleUrls: ['./staff-view-profile.component.css']
})
export class StaffViewProfileComponent implements OnInit {
  public staffId:number=0;
  public teacher:Teacher=new Teacher();
  public address:Address=new Address();
  constructor(private teacherService:TeacherService,
    private addressService:AddressService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.staffId=Number(localStorage.getItem('staffId'));
    console.log(this.staffId);
    this.teacherService.getStaff(this.staffId).subscribe(response=>{
      let responseBody:Response=response;
      this.teacher=responseBody.data;
      console.log(this.teacher);
      this.addressService.getAddress(Number(this.teacher.id)).subscribe(response=>{
        let responseBody:Response=response;
        this.address=responseBody.data;
        console.log(this.address);
      },error=>{
        window.alert(error.error.message);
      });
    },error=>{
      window.alert(error.error.message);
    });
  }
  updateProfile(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(StaffUpdateProfileComponent,{maxWidth: '100vw',
    maxHeight: '100vh',
    width: '750px',
    height: '85vh',});
  }
}
