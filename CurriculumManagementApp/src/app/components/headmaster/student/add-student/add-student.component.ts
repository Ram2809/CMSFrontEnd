import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { Student } from 'src/app/model/student';
import { Class } from 'src/app/model/class';
import { StudentService } from 'src/app/services/student.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentAssign } from 'src/app/model/student-assign';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public roomNo: number = 0;
  public classRoomNoList: Class[] = [];
//public standardSet=new Set();

  AddStudentForm = new FormGroup({
    rollNo: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    contactNo: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    address: new FormControl('', Validators.required),
    academicYear: new FormControl('', Validators.required),
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required)
  });
  constructor(private classService: ClassService,
    private studentService: StudentService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.classService.getAllClasses().subscribe(response => {
      let responseBody: Response = response;
      this.classRoomNoList = responseBody.data;
    }, error => {
      this.notificationService.errorMessage(error.error.message);
    });
    // for(let i in this.classRoomNoList){
    //   this.standardSet.add(this.classRoomNoList[i]);
    // }
    // console.log(this.standardSet);
  }
  addStudent() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const student = new Student();
      student.rollNo = this.rollNo?.value;
      student.firstName = this.firstName?.value;
      student.lastName = this.lastName?.value;
      student.dateOfBirth = this.dateOfBirth?.value;
      student.gender = this.gender?.value;
      student.contactNo = this.contactNo?.value;
      student.address = this.address?.value;
      this.studentService.addStudent(student).subscribe(data => {
        let responseBody: Response = data;
        this.notificationService.successMessage(String(responseBody.message));
        this.addStudentAssign(student);
        this.AddStudentForm.reset();
      }, error => {
        this.notificationService.errorMessage(error.error.message);
      });
    }
  }
  addStudentAssign(student: Student) {
    const studentAssign: StudentAssign = new StudentAssign();
    studentAssign.academicYear=this.academicYear?.value;
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      const classDetail: Class = new Class();
      classDetail.roomNo = this.roomNo;
      studentAssign.classDetail = classDetail;
      studentAssign.student = student;
      console.log(studentAssign);
      this.studentService.addStudentAssign(studentAssign).subscribe(response => {
        let responseBody: Response = response;
        this.notificationService.successMessage(responseBody.message!);
      }, error => {
        this.notificationService.errorMessage(error.error.message);
      });
    });
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  get rollNo() {
    return this.AddStudentForm.get('rollNo');
  }
  get firstName() {
    return this.AddStudentForm.get('firstName');
  }
  get lastName() {
    return this.AddStudentForm.get('lastName');
  }
  get dateOfBirth() {
    return this.AddStudentForm.get('dateOfBirth');
  }
  get gender() {
    return this.AddStudentForm.get('gender')
  }
  get contactNo() {
    return this.AddStudentForm.get('contactNo')
  }
  get address() {
    return this.AddStudentForm.get('address')
  }
  get standard() {
    return this.AddStudentForm.get('standard');
  }
  get section() {
    return this.AddStudentForm.get('section');
  }
  get academicYear() {
    return this.AddStudentForm.get('academicYear');
  }
}
