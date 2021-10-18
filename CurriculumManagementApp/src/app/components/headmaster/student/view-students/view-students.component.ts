import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/model/student';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { Response } from 'src/app/model/response';
import { Router } from '@angular/router';
import { Class } from 'src/app/model/class';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateStudentComponent } from '../update-student/update-student.component';
import { StudentAssign } from 'src/app/model/student-assign';
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  public studentsList: StudentAssign[] = [];
  public student: Student = new Student();
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public roomNo: number = 0;
  public isHidden: boolean = false;
  public errorMessage: string = "";
  constructor(private studentService: StudentService,
    private classService: ClassService,
    private router: Router,
    private dialog: MatDialog) { }

  ViewStudentForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    option: new FormControl(''),
    academicYear:new FormControl('',Validators.required)
  });
  ngOnInit(): void {

  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getStudents() {
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      this.studentService.getStudentClassDetails(this.roomNo,this.academicYear?.value).subscribe(response => {
        let responseBody: Response = response;
        this.studentsList = responseBody.data;
        console.log(this.studentsList);
        this.isHidden = false;
      }, error => {
        this.errorMessage = error.error.message;
        this.isHidden = true;
        window.alert(error.error.message);
      });
    }, error => {
      this.errorMessage = error.error.message;
      window.alert(error.error.message);
    });
  }
  // deleteStudent(rollNo:number) {
  //   let response: boolean = window.confirm("Are you sure want to continue?");
  //   if (response) {
  //     this.studentService.deleteStudent(rollNo).subscribe(response => {
  //       let responseBody: Response = response;
  //       window.alert(responseBody.message);
  //       this.getStudents;
  //     }, error => {
  //       window.alert(error.error.message);
  //     });
  //   }
  // }
  updateStudent(studentAssign:StudentAssign) {
    localStorage.setItem('studentAssign', JSON.stringify(studentAssign));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateStudentComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '750px',
      height: '85vh',
    });
  }
  get standard() {
    return this.ViewStudentForm.get('standard');
  }
  get section() {
    return this.ViewStudentForm.get('section');
  }
  get option() {
    return this.ViewStudentForm.get('option');
  }
  get academicYear(){
    return this.ViewStudentForm.get('academicYear');
  }

}
