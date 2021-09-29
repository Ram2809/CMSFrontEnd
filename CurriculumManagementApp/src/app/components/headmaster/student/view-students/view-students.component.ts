import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { Response } from 'src/app/model/response';
import { Router } from '@angular/router';
import { Class } from 'src/app/model/class';
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  public studentsList: Student[] = [];
  public student: Student = new Student();
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public roomNo: number =0;
  public isShown: boolean = false;
  constructor(private studentService: StudentService,
    private classService: ClassService,
    private router: Router) { }
  ViewStudentForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    option: new FormControl(''),
  });
  ngOnInit(): void {

  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody:Response=response;
      this.classList = responseBody.data;
      console.log(this.classList);
    },error=>{
      window.alert(error.error.message);
    })
  }
  getStudents() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody:Response = response;
      console.log(responseBody.data);
      this.roomNo = responseBody.data;
      this.studentService.getStudents(this.roomNo).subscribe(response => {
        let responseBody:Response = response;
        console.log(responseBody.data);
        this.studentsList = responseBody.data;
      },error=>{
        window.alert(error.error.message);
      });
    },error=>{
      window.alert(error.error.message);
    });
    this.isShown = true;
  }
  deleteStudent() {
    this.studentService.deleteStudent(this.ViewStudentForm.get('option')?.value).subscribe(response => {
      let responseBody:Response=response;
      window.alert(responseBody.message);
      this.getStudents;
    });
  }
  backToMain() {
    this.router.navigate(['admin'])
  }
  get standard() {
    return this.ViewStudentForm.get('standard');
  }
  get section() {
    return this.ViewStudentForm.get('section');
  }

}
