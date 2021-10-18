import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentAssign } from 'src/app/model/student-assign';
import { NotificationService } from 'src/app/services/notification.service';
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
  public studentAssign: StudentAssign = new StudentAssign();
  public student: Student = new Student();
  public classDetail: Class = new Class();

  constructor(private classService: ClassService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<UpdateStudentComponent>,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    let studentAssignEntity:string=localStorage.getItem('studentAssign')!;
    this.studentAssign = JSON.parse(studentAssignEntity);
    console.log(this.studentAssign)
    this.student=this.studentAssign.student!;
    this.classDetail=this.studentAssign.classDetail!;
      this.classService.getClassesByStandard(String(this.classDetail.standard)).subscribe(response => {
        let responseBody: Response = response;
        this.classList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
  }

  updateStudent() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const classEntity: Class = this.classDetail;
      const studentDetail: Student = this.student;
      this.studentService.updateStudent(Number(this.student.rollNo), studentDetail).subscribe(response => {
        let responseBody: Response = response;
        this.updateStudentAssign();
        this.notificationService.successMessage(String(responseBody.message));
        this.close();
      }, error => {
        this.notificationService.errorMessage(error.error.message);
      });
    }
  }
  updateStudentAssign(){
    this.classService.getClassRoomNo(String(this.classDetail.standard),String(this.classDetail.section)).subscribe(response=>{
      let responseBody:Response=response;
      this.roomNo=responseBody.data;
    this.classDetail.roomNo=this.roomNo;
    this.studentAssign.classDetail=this.classDetail;
    this.studentAssign.student=this.student;
    this.studentService.addStudentAssign(this.studentAssign).subscribe(response=>{
      let responseBody:Response=response;
      this.notificationService.successMessage(String(responseBody.message));
    },error=>{
      this.notificationService.errorMessage(error.error.message);
    });
  },error=>{
    this.notificationService.errorMessage(error.error.message);
  });
  }
  close() {
    this.dialogRef.close();
  }
}
