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
  public roomNo: Number | any;
  public response: Response = new Response();
  public studentCount: number = 0;
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
    this.classService.getClassesByStandard(this.standard?.value).subscribe(data => {
      this.response = data;
      this.classList = this.response.data;
      console.log(this.classList)
    })
  }
  getStudents() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(data => {
      this.response = data;
      console.log(this.response);
      this.roomNo = this.response.data;
      this.studentService.getStudents(this.roomNo).subscribe(data => {
        this.response = data;
        console.log(this.response.data);
        this.studentsList = this.response.data;
        this.studentCount = this.studentsList.length;
        console.log(this.studentCount);
      });
    });
    this.isShown = true;
  }
  deleteStudent() {
    this.studentService.deleteStudent(this.ViewStudentForm.get('option')?.value).subscribe(data => {
      this.response = data;
      window.alert(this.response.message);
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
