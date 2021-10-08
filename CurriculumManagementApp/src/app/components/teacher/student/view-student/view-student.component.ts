import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Response } from 'src/app/model/response';
import { TeacherService } from 'src/app/services/teacher.service';
import { SubjectService } from 'src/app/services/subject.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public assignIdList: Number[] = [];
  public roomNoList:Number[]=[];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public studentList: Student[] = [];
  public errorMessage: string = "";
  public isHidden: boolean = false;

  ViewStudentForm = new FormGroup({
    class: new FormControl('', Validators.required),
  });

  constructor(private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classService: ClassService,
    private studentService: StudentService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      this.assignIdList = responseBody.data;
      this.subjectService.getRoomNoList(this.assignIdList).subscribe(response=>{
        let responseBody:Response=response;
        this.roomNoList=responseBody.data;
        this.classService.getClassList(this.roomNoList).subscribe(response=>{
          let responseBody:Response=response;
          this.classList=responseBody.data;
        },error=>{
          window.alert(error.error.message);
        })
      },error=>{
        window.alert(error.error.message);
      })
    },  error => {
      window.alert("No subject assigned for" + " " + this.staffId);
    });
  }
  getStudents() {
    let standard: string = this.class?.value.split("-").shift();
    let section: string = this.class?.value.split("-").pop();
    this.classService.getClassRoomNo(standard, section).subscribe(response => {
      let responseBody: Response = response;
      this.classRoomNo = responseBody.data;
      this.studentService.getStudents(this.classRoomNo).subscribe(response => {
        let responseBody: Response = response;
        this.studentList = responseBody.data;
        this.isHidden = false;
      }, error => {
        this.isHidden = true;
        this.errorMessage = error.error.message;
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    });
  }
  get class() {
    return this.ViewStudentForm.get('class');
  }
}
