import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit {
  public teacherList: Teacher[] = [];
  public option: string = "";
  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.teacherService.getAllStaffs().subscribe(response => {
      let responseBody: Response = response;
      this.teacherList = responseBody.data;
      console.log(this.teacherList);
    }, error => {
      window.alert(error.error.message);
    });
  }
  deleteStaff() {
    console.log(this.option);
    this.teacherService.deleteStaff(Number(this.option)).subscribe(response => {
      let responseBody: Response = response;
      window.alert(responseBody.message);
      this.ngOnInit();
    }, error => {
      window.alert(error.error.message);
    });
  }
}
