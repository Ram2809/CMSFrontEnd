import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-staff-view-profile',
  templateUrl: './staff-view-profile.component.html',
  styleUrls: ['./staff-view-profile.component.css']
})
export class StaffViewProfileComponent implements OnInit {
  public staffId:number=0;
  public teacher:Teacher=new Teacher();
  constructor(private teacherService:TeacherService) { }

  ngOnInit(): void {
    this.staffId=Number(localStorage.getItem('staffId'));
    console.log(this.staffId);
    this.teacherService.getStaff(this.staffId).subscribe(response=>{
      let responseBody:Response=response;
      this.teacher=responseBody.data;
      console.log(this.teacher);
    },error=>{
      window.alert(error.error.message);
    })
  }

}
