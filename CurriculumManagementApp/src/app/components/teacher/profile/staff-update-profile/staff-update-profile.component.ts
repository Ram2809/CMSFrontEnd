import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { Teacher } from 'src/app/model/teacher';
import { AddressService } from 'src/app/services/address.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-update-profile',
  templateUrl: './staff-update-profile.component.html',
  styleUrls: ['./staff-update-profile.component.css']
})
export class StaffUpdateProfileComponent implements OnInit {
  public staffId:number=0;
  public teacher:Teacher=new Teacher();
  public address:Address=new Address();
  public qualificationList: String[] = ['B.Ed', 'Ph.D', 'M.Phil', 'M.Sc', 'M.A', 'B.Sc', 'B.A', 'B.Com', 'M.Com'];
  public majorList: String[] = ['Tamil', 'English', 'Maths', 'History', 'Physics', 'Chemistry', 'Computer Science', 'Botany', 'Zoology', 'Physical Education', 'Hindi'];

  constructor(private teacherService:TeacherService,
    private addressService:AddressService,
    private dialogRef:MatDialogRef<StaffUpdateProfileComponent>) { }

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
  updateProfile()
  {
    this.teacherService.updateStaff(this.staffId,this.teacher).subscribe(response=>{
      let responseBody:Response=response;
      window.alert(responseBody.message);
      this.addressService.updateAddress(Number(this.address.id),this.address).subscribe(response=>{
        let responseBody:Response=response;
        window.alert(responseBody.message);
      },error=>{
        window.alert(error.error.message);
      })
    },error=>{
      window.alert(error.error.message);
    })
  }
  close(){
    this.dialogRef.close();
  }
}
