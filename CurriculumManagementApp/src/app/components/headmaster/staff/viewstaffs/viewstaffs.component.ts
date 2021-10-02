import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/model/teacher';
@Component({
  selector: 'app-viewstaffs',
  templateUrl: './viewstaffs.component.html',
  styleUrls: ['./viewstaffs.component.css']
})
export class ViewstaffsComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public standard: string = "";
  public section: string = "";
  public roomNo: number = 0;
  public subject: string = "";
  public id: number = 0;
  public isHidden: boolean = false;
  public subjectAssignList: SubjectAssign[] = [];
  public teacher: Teacher = new Teacher();
  public errorMessage: string = "";
  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {

  }
  getSections() {
    this.classService.getClassesByStandard(this.standard).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    }, error => {
      console.log(error);
      let responseBody: Response = error;
      window.alert(error.error.message);
    });
  }

  getSubjects() {
    this.classService.getClassRoomNo(this.standard, this.section).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      console.log(this.roomNo);
      this.subjectService.getSubjets(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        this.subjectAssignList = responseBody.data;
        console.log(responseBody.data)
        this.isHidden = true;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  getStaff() {
    this.id = Number(this.subject.split("-").shift());
    console.log(this.id);
    this.teacherService.getTeacherId(this.id).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody);
      this.teacherService.getStaff(responseBody.data).subscribe(response => {
        let responseBody: Response = response;
        this.teacher = responseBody.data;
        this.isHidden=false;
        console.log(this.teacher);
      }, error => {
        this.isHidden=true;
        this.errorMessage=error.error.message;
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
}
