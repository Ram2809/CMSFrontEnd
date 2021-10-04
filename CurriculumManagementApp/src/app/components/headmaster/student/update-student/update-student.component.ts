import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public roomNo: number = 0;
  public standard: string = "";
  public section: string = "";
  public rollNo: number = 0;
  public student: Student = new Student();
  public classDetail: Class = new Class();

  constructor(private classService: ClassService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<UpdateStudentComponent>) { }

  ngOnInit(): void {
    this.rollNo = Number(localStorage.getItem('rollNo'));
    console.log(this.rollNo);
    this.studentService.getStudent(this.rollNo).subscribe(response => {
      let responseBody: Response = response;
      this.student = responseBody.data;
      console.log(this.student);
      this.classDetail = this.student.classDetail!;
      console.log(this.classDetail);
      console.log(String(this.classDetail.standard));
      this.classService.getClassesByStandard(String(this.classDetail.standard)).subscribe(response => {
        let responseBody: Response = response;
        this.classList = responseBody.data;
        console.log(this.classList);
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    })
  }

  updateStudent() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const classEntity: Class = this.classDetail;
      const studentDetail: Student = this.student;
      studentDetail.classDetail = classEntity;
      console.log(studentDetail);
      this.studentService.updateStudent(this.rollNo, studentDetail).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.close();
      },error=>{
        window.alert(error.error.message);
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
